import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { Box } from "@mui/material";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    
      <Editor
        height="100%"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    
  );
};
export default CodeEditorWindow;