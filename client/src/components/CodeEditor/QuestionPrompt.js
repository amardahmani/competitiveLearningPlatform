import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general"
import { languageOptions } from "../../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, AlertTitle, Box,Button,Stack, Typography } from "@mui/material";
import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
//import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";
import { getAlgorithmic } from "../../services/questions.service";
import { useParams } from "react-router-dom";
import ThemeDropdown from "./ThemeDropdown";
import { createSubmission } from "../../services/submission.service";
const QuestionPrompt = (props) => {
  
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const params = useParams();
  const [isSolved,setIsSolved] = useState("");
  console.log(params);
  const {problem} = props;
  
  
  
  console.log(problem)

  const [content,setContent] = useState([]);

    

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin:btoa("ooxx\r\nxooxx"),
      expected_output: btoa("true\nfalse\n"),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*",wait:"true" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "17b3cb1548msha7edecb8275e1b4p11de52jsne0449cbaa266",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "17b3cb1548msha7edecb8275e1b4p11de52jsne0449cbaa266",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);

        const formData = new FormData();
        formData.append('code',code);
        formData.append('status',response.data.status?.description);
        formData.append('challenge',params.challengeID);
        formData.append('question',params.challengeID);
        formData.append('points',problem.algorithmic.points);
        formData.append('type','Algorithmic');
        formData.append('language',language.name);

        await createSubmission(formData).then((res) => {
          console.log(res);
          setIsSolved(res.data.message)
        }).catch((err) => {
          console.log(err);
        })

        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
    
    <Box display="flex" backgroundColor='background.default'>
      
        

        <Box width='45%'
        
      display='flex' flexDirection='column' justifyContent='center' alignItems='space-between'>
        
          <Typography variant="h2" textAlign='center' mt={2}></Typography>
          <Box sx={{lineHeight:'3'}} p={4}>
            {problem ? 
            <div dangerouslySetInnerHTML={{ __html: problem.algorithmic.description }} />  
            : <p>loading...</p>}
          
          </Box>
        </Box>
        <Box width="55%" sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  <Box display="flex" flexDirection="row">
    <LanguagesDropdown onSelectChange={onSelectChange} />
    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
  </Box>
  <Box sx={{ flex: 1 }}>
  {outputDetails && <OutputDetails outputDetails={outputDetails} />}

    <CodeEditorWindow
      code={code}
      onChange={onChange}
      language={language?.value}
      theme={theme?.value}
    />
  </Box>
  <Box>
    <Button
      onClick={handleCompile}
      variant="contained"
      disabled={!code}
      sx={{ float: "right" }}
      fullWidth
    >
      Submit
    </Button>
    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
  </Box>
  
</Box>
    </Box>
    </>
  )
}

export default QuestionPrompt;