import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
// export default function Pagination({ page, totalPages, handlePageChange }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "2rem",
//         flexWrap: "wrap",
//       }}
//     >
//       <Tooltip title="Jump to first page">
//         <Button
//           variant="outlined"
//           style={{
//             borderRadius: "50%",
//             minWidth: "2.5rem",
//             height: "2.5rem",
//             marginRight: "0.625rem",
//             borderColor: "#000080",
//           }}
//           onClick={() => handlePageChange(1)}
//           disabled={page === 1}
//         >
//           {"<<"}
//         </Button>
//       </Tooltip>
//       <Tooltip title="Previous page">
//         <Button
//           variant="outlined"
//           style={{
//             borderRadius: "50%",
//             minWidth: "2.5rem",
//             height: "2.5rem",
//             marginRight: "0.625rem",
//             borderColor: "#000080",
//           }}
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//         >
//           {"<"}
//         </Button>
//       </Tooltip>
//       {[...Array(totalPages)].map((_, index) => (
//         <Button
//           key={index}
//           variant="outlined"
//           style={{
//             borderRadius: "50%",
//             minWidth: "2.5rem",
//             height: "2.5rem",
//             marginRight: "0.625rem",
//             borderColor: "#000080",
//             fontWeight: page === index + 1 ? "bold" : "normal",
//             color: "#191970",
//           }}
//           onClick={() => handlePageChange(index + 1)}
//         >
//           {index + 1}
//         </Button>
//       ))}
//       <Tooltip title="Next page">
//         <Button
//           variant="outlined"
//           style={{
//             borderRadius: "50%",
//             minWidth: "2.5rem",
//             height: "2.5rem",
//             marginRight: "0.625rem",
//             borderColor: "#000080",
//           }}
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === totalPages}
//         >
//           {">"}
//         </Button>
//       </Tooltip>
//       <Tooltip title="Jump to last page">
//         <Button
//           variant="outlined"
//           style={{
//             borderRadius: "50%",
//             minWidth: "2.5rem",
//             height: "2.5rem",
//             borderColor: "#000080",
//           }}
//           disabled={page === totalPages}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {">>"}
//         </Button>
//       </Tooltip>
//     </div>
//   );
// }

export default function Pagination({ page, totalPages, handlePageChange }) {
  let pageRangeSetter = 5; // Set the page range to show for large data sets here
  const renderPageButtons = () => {
    const buttons = [];
    let startPage = 1;
    if (page <= pageRangeSetter) {
      startPage = 1;
    } else {
      startPage = page - pageRangeSetter;
    }
    let endPage = Math.min(page + pageRangeSetter, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outlined"
          style={{
            borderRadius: "50%",
            minWidth: "2.5rem",
            height: "2.5rem",
            marginRight: "0.625rem",
            borderColor: "#000080",
            fontWeight: page === i ? "bold" : "normal",
            color: "#191970",
          }}
          onClick={() => handlePageChange(i)}
          // disabled={page === i}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}
    >
      <Tooltip title="Jump to first page">
        <Button
          variant="outlined"
          style={{
            borderRadius: "50%",
            minWidth: "2.5rem",
            height: "2.5rem",
            marginRight: "0.625rem",
            borderColor: "#000080",
          }}
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          {"<<"}
        </Button>
      </Tooltip>
      <Tooltip title="Previous page">
        <Button
          variant="outlined"
          style={{
            borderRadius: "50%",
            minWidth: "2.5rem",
            height: "2.5rem",
            marginRight: "0.625rem",
            borderColor: "#000080",
          }}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </Button>
      </Tooltip>
      {renderPageButtons()}
      <Tooltip title="Next page">
        <Button
          variant="outlined"
          style={{
            borderRadius: "50%",
            minWidth: "2.5rem",
            height: "2.5rem",
            marginRight: "0.625rem",
            borderColor: "#000080",
          }}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          {">"}
        </Button>
      </Tooltip>
      <Tooltip title="Jump to last page">
        <Button
          variant="outlined"
          style={{
            borderRadius: "50%",
            minWidth: "2.5rem",
            height: "2.5rem",
            borderColor: "#000080",
          }}
          disabled={page === totalPages || totalPages === 0}
          onClick={() => handlePageChange(totalPages)}
        >
          {">>"}
        </Button>
      </Tooltip>
    </div>
  );
}
