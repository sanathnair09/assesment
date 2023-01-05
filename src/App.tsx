import { useCallback, useRef } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchGIFByPage } from "./redux/reducers/data";

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
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && currentPage < maxPages) {
            dispatch(
              fetchGIFByPage({ search: keyword, page: currentPage + 1 })
            );
          }
        });
        if (ref) observer.current.observe(ref);
        window.removeEventListener("scroll", eventHandler);
      };
      window.addEventListener("scroll", eventHandler);
    },
    [currentPage, keyword, maxPages]
  );

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#121212",
        display: "flex",
        height: "110vh",
      }}
    >
      <div
        style={{
          display: "flex",
          marginLeft: "10vh",
          marginRight: "10vh",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        <SearchBar />
      </div>
      {urls.length >= 2 ? (
        <div style={{ flex: 1 }}>
          <Container
            fluid
            style={{
              // flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#121212",
            }}
          >
            {urls.map((urlGroup, row) => {
              return (
                <Row>
                  {urlGroup.map((url, col) => {
                    return (
                      <Col>
                        {row === urls.length - 1 &&
                        col === urlGroup.length - 1 ? (
                          <Image
                            src={url.url}
                            className="m-1"
                            rounded
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            ref={lastElementRef}
                          />
                        ) : (
                          <Image
                            src={url.url}
                            className="m-1"
                            rounded
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                          />
                        )}
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default App;
