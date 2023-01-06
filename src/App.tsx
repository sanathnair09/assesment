import { useCallback, useRef } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchGIFByPage } from "./redux/reducers/data";
import { ImageData } from "./types/apiTypes";
import "./styles/app.css";

const PAGINATION_OFFSET = 10;
const IMAGE_SIZE = 320 / 1.2;

const App = () => {
  const dispatch = useAppDispatch();

  const { urls, keyword, maxPages, currentPage } = useAppSelector(
    (state) => state.data
  );

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (ref: any) => {
      const eventHandler = () => {
        let limiter = 0;
        if (limiter === 0) {
          if (observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && currentPage < maxPages) {
              dispatch(
                fetchGIFByPage({
                  search: keyword,
                  page: currentPage + PAGINATION_OFFSET,
                })
              );
            }
          });
          if (ref) observer.current.observe(ref);
          limiter++;
          window.removeEventListener("scroll", eventHandler);
        }
      };
      window.addEventListener("scroll", eventHandler);
    },
    [currentPage, keyword, maxPages, dispatch]
  );

  const generateRow = (row: number, data: ImageData[]) => {
    return data.map((url, index) => (
      <Col key={index + url.id}>
        {row === urls.length - 1 && index === data.length - 1 ? (
          <Image
            key={url.id}
            src={url.url}
            className="m-1"
            rounded
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            ref={lastElementRef}
          />
        ) : (
          <Image
            key={url.id}
            src={url.url}
            className="m-1"
            rounded
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
          />
        )}
      </Col>
    ));
  };

  return (
    <div id="app-container">
      <div id="search-container">
        <SearchBar />
      </div>
      {urls.length >= 2 ? (
        <Container fluid id="table-container">
          {urls.map((group, row) => (
            <Row>{generateRow(row, group)}</Row>
          ))}
        </Container>
      ) : null}
    </div>
  );
};

export default App;
