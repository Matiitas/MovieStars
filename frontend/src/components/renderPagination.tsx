import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

interface IPaginationProps {
  actualPage: number;
  cantPages: number;
  handlePageChange(page: number): void;
}

function RenderPagination(props: IPaginationProps) {
  const [showPages, setshowPages] = useState<number[]>([]);
  const [initialEllipsis, setinitialEllipsis] = useState(false);
  const [finalEllipsis, setfinalEllipsis] = useState(false);

  const handlePageChange = (event: any) => {
    const page = Number(event.target.id);
    props.handlePageChange(page);
  };

  useEffect(() => {
    const pageNumbers = [];
    let showPages = [];
    for (let i = 1; i <= props.cantPages; i++) {
      pageNumbers.push(i);
    }

    showPages = pageNumbers.filter((num) => {
      return num - props.actualPage > -4 && num - props.actualPage < 4;
    });

    if (props.cantPages - props.actualPage > 3) {
      setfinalEllipsis(true);
    } else {
      setfinalEllipsis(false);
    }

    if (props.actualPage > 4) {
      setinitialEllipsis(true);
    } else {
      setinitialEllipsis(false);
    }
    setshowPages(showPages);
  }, [props.actualPage, props.cantPages]);

  return (
    <React.Fragment>
      <Pagination
        style={{
          position: "absolute",
          bottom: "1px",
          marginTop: "10px",
          backgroundColor: "blue",
        }}
      >
        {initialEllipsis ? (
          <React.Fragment>
            {" "}
            <Pagination.Item
              key={1}
              id={"1"}
              active={props.actualPage === 1}
              onClick={handlePageChange}
            >
              {1}
            </Pagination.Item>{" "}
            <Pagination.Ellipsis disabled />{" "}
          </React.Fragment>
        ) : null}
        {showPages.map((num) => {
          if (Number.isInteger(num)) {
            return (
              <Pagination.Item
                key={num}
                id={num.toString()}
                active={props.actualPage === num}
                onClick={handlePageChange}
              >
                {num}
              </Pagination.Item>
            );
          } else {
            return <Pagination.Ellipsis key={num} disabled />;
          }
        })}
        {finalEllipsis ? (
          <React.Fragment>
            <Pagination.Ellipsis disabled />{" "}
            <Pagination.Item
              key={props.cantPages}
              id={props.cantPages.toString()}
              active={props.actualPage === props.cantPages}
              onClick={handlePageChange}
            >
              {props.cantPages}
            </Pagination.Item>{" "}
          </React.Fragment>
        ) : null}
      </Pagination>
    </React.Fragment>
  );
}

export default RenderPagination;
