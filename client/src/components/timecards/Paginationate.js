import { Button } from "@material-ui/core";
import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginationate({ page, pages, userTimecards = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              userTimecards === "user"
                ? `/my_time/page/${x + 1}`
                : `/timecard/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginationate;
