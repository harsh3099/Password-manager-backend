import React, { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface FormData {
  id: number | null;
  domainName: string;
  domainUrl: string;
  username: string;
  password: string;
  pin: string;
  accountNumber: string;
  ifscCode: string;
  transactionpassword: string;
}

const Helper: React.FC<{ children: React.ReactNode }> = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    id: null,
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    pin: "",
    accountNumber: "",
    ifscCode: "",
    transactionpassword: ""
  });
  const [temp, setTemp] = useState<FormData>({
    id: null,
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    pin: "",
    accountNumber: "",
    ifscCode: "",
    transactionpassword: ""
  });
  // const [temp,setTemp]=useState([]);
  const [formData, setFormData] = useState<FormData[]>([]);

  const getResultData = () => {
    fetch(
      `http://ltin1158041:8081/_api/web/lists/getbytitle('PasswordDB')/items`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((val) => {
        // console.log("Data:", val);
        setTemp(val.value);
        // Process fetched data here, if needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error here, such as displaying an error message
      });
  };
  

  const setResultData = (data: FormData[]) => {
    localStorage.setItem("formDataList", JSON.stringify(data));
  };

  const findString = (value: string, findValue: string) => {
    return value?.toLowerCase()?.includes(findValue?.toLowerCase());
  };

  const handleEdit = (id:any)=>{
    navigate(`/form/${id}`);
  }

  return (
    <>
      <div>
        <NoteContext.Provider
          value={{
            handleEdit,
            findString,
            setResultData,
            getResultData,
            setData,
            setFormData,
            formData,
            data,
            temp,
            setTemp,
            // updateItem,
          }}
        >
          {props.children}
        </NoteContext.Provider>
      </div>
      <ToastContainer />
    </>
  );
};

export default Helper;
