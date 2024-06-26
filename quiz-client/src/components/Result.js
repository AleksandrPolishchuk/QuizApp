import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext from "../hooks/useStateContext";
import { green } from "@mui/material/colors";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    console.log("ids: " + ids);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
        for (let i = 0; i < qna.length; i++)
          console.log(
            "qna>>" + `${i} : a=${qna[i].answer} / so=${qna[i].selectedOptions}`
          );
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selectedOptions ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timerTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congradulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
}
