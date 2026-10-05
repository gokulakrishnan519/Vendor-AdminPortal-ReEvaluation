import React from "react";

const PowerBI = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <iframe
        title='Power BI Report'
        width='100%'
        height='100%'
        src='https://app.powerbi.com/view?r=eyJrIjoiNGUxMWFhODEtNTA1ZC00YjFlLTkyOTItMGU1ZjExMmEwMmYwIiwidCI6ImY5ZjAxMTg2LTdkNjItNGNiNC04MzFmLTZmOGE4Y2MyNzNhYiJ9'
        frameBorder='0'
        allowFullScreen={true}
      />
    </div>
  );
};

export default PowerBI;
