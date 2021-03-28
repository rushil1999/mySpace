import React from "react";

function Preview(props: any) {
  const { file } = props;
  return (
    <div>
      <iframe width="1000" height="1000" src={file}></iframe>
    </div>
  );
}

export default Preview;
