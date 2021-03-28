import React, { useEffect, useState } from "react";

function Preview(props: any) {
  const { file } = props;
  const [fileState, setFileState] = useState(file);

  useEffect(() => {
    console.log("PREVIEW", file);
    setFileState(file);
  }, [file]);

  return (
    <div>
      <iframe width="1000" height="1000" src={fileState}></iframe>
    </div>
  );
}

export default Preview;
