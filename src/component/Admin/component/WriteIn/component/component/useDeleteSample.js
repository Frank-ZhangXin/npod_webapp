import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useDeleteSample(
  caseId,
  vialId,
  deleting,
  setAccept,
  setDeleteMsg,
  setDeleteSuccess
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (deleting && vialId !== null) {
      deleteSample(caseId, vialId);
      console.log("The sample has been deleted!");
    } else {
      console.log("Sample delete condition has not met.");
      if (deleting) {
        setDeleteSuccess(false);
        setDeleteMsg(`Sample case ${caseId} delete has failed.`);
      }
    }
  }, [caseId, vialId, deleting]);

  async function deleteSample(the_case_id, the_vial_id) {
    console.log("Deleting sample");
    return await API.del("dbapi", "/db/delete_sample", {
      body: {
        case_id: the_case_id,
        vial_id: the_vial_id,
      },
    })
      .then((res) => {
        console.log(res);
        setResult(true);
        setDeleteSuccess(true);
        setDeleteMsg(
          `Sample of the case ${the_case_id} was deleted successfully.`
        );
        console.log(
          `Sample of the case ${the_case_id} was deleted successfully.`
        );
      })
      .catch((error) => {
        console.log("[Sample Delete] Amplify API call error", error);
        setDeleteSuccess(false);
        setResult(false);
        setAccept(false);
      });
  }
  return result;
}
