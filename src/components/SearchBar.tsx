import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchGIFByPage,
  reset,
  updateSearchKeyword,
} from "../redux/reducers/data";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const search = () => {
    dispatch(reset());
    dispatch(updateSearchKeyword(value));
    dispatch(fetchGIFByPage({ search: value, page: 0 }));
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      search();
    }
  };
  const onReset = () => {
    dispatch(reset());
    setValue("");
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <>
        <InputGroup>
          <Form.Control
            placeholder="Search GIF"
            // aria-describedby="basic-addon2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          <Button id="button-addon1" onClick={search}>
            Search
          </Button>
        </InputGroup>
      </>
      <>
        <Button variant="danger" className="ms-3" onClick={onReset}>
          Clear
        </Button>
      </>
    </div>
  );
};

export default SearchBar;
