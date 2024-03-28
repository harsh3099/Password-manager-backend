import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { IoEyeOff, IoEye, IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

import LockIcon from "@mui/icons-material/Lock";
import NoteContext from "../../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { LdButton, LdIcon, LdLabel } from "@emdgroup-liquid/liquid/dist/react";
import { ColorLens } from "@mui/icons-material";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {getResultData,temp, setTemp}=context;
  const [resultData, setResultData] = useState<any[]>([]);
  const [localData, setLocalData] = useState<any[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: number]: boolean }>({});

  // const fetchData = () => {
  //   setResultData(context.getResultData());
  //   setLocalData(context.getResultData());
  // };

  useEffect(()=>{
     getResultData();
    //  console.log("datasss :" ,temp);
     
  },[])
  const tdata = {
    id: null,
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    pin: "",
    accountNumber: "",
    ifscCode: "",
    transactionpassword: ""
  };


  const handleSearch = (value: string) => {
    console.log(value);
    if(!value.trim()){
      getResultData();
    }
    else{
    fetch(`http://ltin1158041:8081/_api/web/lists/getbytitle('PasswordDB')/items?$filter=substringof('${encodeURIComponent(value)}',Title)`, {
      headers: {
        "Content-Type": "application/json;odata=verbose",
        "Accept": "application/json;odata=verbose",
      }
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the search results received from the backend
        const updatedData = data.d.results;
        setTemp(updatedData);
      })
      .catch((error) => {
        console.error("Error searching database:", error);
      });
    }
  };
  

  const togglePassword = (index: number) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [index]: !prevVisiblePasswords[index],
    }));
  };

  const copyClipboard = (data: any) => {
    navigator.clipboard.writeText(data.password || data.pin);
    toast.success("copied Successfully!");
  };

  const handleAdd = () => {
    context.setData(tdata);
    navigate("/Form");
  };

  const handleDelete = async (id:number) => {
    // console.log(id);
    try {
      const response = await fetch(
        `http://ltin1158041:8081/_api/web/lists/getbytitle('PasswordDB')/items(${id})`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
  
      // console.log("Item deleted successfully");
      const val=temp.filter((e) => e.id !== id)
      setTemp(val);
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <>
      
      <div className="navigation">
        <div className="search">
          <LdLabel className="ldlabel">Search :</LdLabel>
          <input
            className="input"
            type="text"
            placeholder="search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          
        </div>
        <div className="addbutton">
          <LdButton className="ldbutton" mode="danger" onClick={(e) => handleAdd()}> Add</LdButton>
         
        </div>
      </div>
      <div className="body">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="url">Url</th>
              <th className="username">Username</th>
              <th className="password_pin">Password/Pin</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {temp.length ? (
              temp.map((item, index) => {
                const { domainName, url, username, ID, password, pin, transactionpassword, Title } = item;
                return (
                  <tr key={index}>
                    <td>{Title}</td>
                    <td>
                      <a className="link" target="/" href={url}>
                        {url} 
                      </a>
                      {/* {ID} */}
                    </td>
                    <td>{username}</td>
                    <td className="pass">
                      {visiblePasswords[index] ? (
                        <span className="visible_password">{password || pin || transactionpassword}</span>
                      ) : (
                        <span className="password">{"******"}</span>
                      )}
                      {visiblePasswords[index] ? (
                        <>
                          <span className="copy" onClick={() => copyClipboard(item)}>
                            {/* <IoCopy /> */}
                            <LdIcon name="copy"/>
                          
                          </span>
                          <span className="eye" onClick={() => togglePassword(index)}>
                            {/* <IoEye /> */}
                            <LdIcon name="visibility"/>
                            
                          </span>
                        </>
                      ) : (
                        <span className="eye" onClick={() => togglePassword(index)}>
                          <IoEyeOff />
                        </span>
                      )}
                     
                    </td>
                    <td>
                      <div className="action">
                        <EditIcon fontSize="medium" onClick={() => context.handleEdit(ID)} />
                        <DeleteIcon fontSize="medium" onClick={() => handleDelete(ID)} />
                        {/* <MdDelete fontSize="54px" onClick={()=> handleDelete(id)}/> */}
                      </div>
                    
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-5" style={{ textAlign: "center" }}>
                  <h1>No data available</h1>
                </td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
