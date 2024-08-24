import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { renderTableRows } from "helpers/event-utils";

// Custom hook for managing the expand/collapse logic
const useExpandButton = (tableBodyRef, tableContainerRef, isTableExpanded, data) => {
  const [showExpandButton, setShowExpandButton] = useState(false);

  useEffect(() => {
    const tableBody = tableBodyRef.current;
    const container = tableContainerRef.current;

    if (tableBody && !isTableExpanded) {
      setShowExpandButton(tableBody.scrollHeight > container.clientHeight);
    }
  }, [data, isTableExpanded, tableBodyRef, tableContainerRef]);

  return showExpandButton;
};

function DynamicTable({ data, highlighted, tableKey }) {
  const headers = useMemo(() => Object.keys(data[0] || {}), [data]);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const tableContainerRef = useRef(null);
  const tableBodyRef = useRef(null);

  const showExpandButton = useExpandButton(tableBodyRef, tableContainerRef, isTableExpanded, data);

  const handleExpand = useCallback(() => {
    setIsTableExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsTableExpanded(false);
  }, [tableKey]);

  return (
    <>
      <div
        ref={tableContainerRef}
        className="scrollable-table"
        style={{
          maxHeight: isTableExpanded ? "fit-content" : "25rem",
          overflow: "auto",
          position: "relative",
        }}
      >
        <table id={tableKey} className="fixed-header">
          <thead>
            <tr>
              {headers.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>{renderTableRows(data, headers, highlighted)}</tbody>
        </table>
      </div>
      {showExpandButton && (
        <div
          onClick={handleExpand}
          style={{
            cursor: "pointer",
          }}
        >
          {isTableExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      )}
    </>
  );
}

export default DynamicTable;
