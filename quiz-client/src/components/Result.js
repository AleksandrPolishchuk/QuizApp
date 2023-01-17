import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";

export default function Result() {
  const { context, setContext } = useStateContext();
  const { score, setScore } = useState(0);
  const { qnAnswers, setQnAnswers } = useState([]);

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      });
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selectedOptions ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  return <div>Result</div>;
}
