import React, { useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";

export default function Result() {
  const { context, setContext } = useStateContext();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return <div>Result</div>;
}
