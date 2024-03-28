import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/form.css";
import NoteContext from "../../context/NoteContext";
import { ToastContainer, toast } from "react-toastify";
import { LdButton, LdInput } from "@emdgroup-liquid/liquid/dist/react";

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

const AddEditForm: React.FC = () => {
  const { id } = useParams();
  const context = useContext(NoteContext);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
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

  useEffect(() => {
    if (context.data.domainName.length > 0) {
      setFormData(context.data);
    } else {
      setFormData({
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
    }
  }, []);

  const handleCancel = () => {
    localStorage.setItem("formDataList", JSON.stringify([...context.formData]));
    context.setData({
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
    navigate("/");
    
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadataResponse = await fetch(
          `http://ltin1158041:8081/_api/web/lists/getbytitle('PasswordDB')/items(${id})`,
          {
            method: "GET",
            headers: {
              Accept: "application/json;odata=verbose",
            },
          }
        );
  
        if (!metadataResponse.ok) {
          throw new Error("Failed to fetch item metadata");
        }
  
        // Parse the metadata response
        const metadata = await metadataResponse.json();
        console.log("metadata:", metadata);
        const itemToEdit={
          id: metadata.d.id,
          domainName: metadata.d.Title,
          password:metadata.d.password ? metadata.d.password : metadata.d.pin,
          domainUrl: metadata.d.url,
          pin:metadata.d.password ? metadata.d.password : metadata.d.pin,
          username: metadata.d.username,
          transactionpassword: "",
          ifscCode: metadata.d.ifsccode,
          accountNumber: metadata.d.accountnumber,

    
        }
        setFormData(itemToEdit);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
  
    fetchMetadata(); // Call the inner function

   
  
  }, []); 
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listItemData = {
        Title: formData.domainName,
        password: formData.password ? formData.password : formData.pin,
        url: formData.domainUrl,
        username: formData.username ,
        accountnumber:formData.accountNumber,
        ifsccode:formData.ifscCode,
        __metadata: {"type": "SP.Data.PasswordDBListItem"}
    };
    // Edit Mode
 
    if(id && id !== "Form"){
      console.log(id);
      try{
      const url = `http://ltin1158041:8081/_api/web/lists/getbytitle('PasswordDB')/items(${id})`;
  
      // Make a POST request with X-HTTP-Method: MERGE header for partial update
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "accept": "application/json;odata=verbose",
          "X-HTTP-Method": "MERGE",
          "Content-Type": "application/json;odata=verbose",
          "IF-MATCH": "*",
        },
        body: JSON.stringify(listItemData),
      });
  
      // Check if the request was successful
      console.log(response);
      if(response.status===204){
        navigate("/");
        toast.success("Edit successful!");
      }


     
    }catch(error){
      console.error("Error editing item:", error);
    toast.error("An error occurred while editing the item.");
    }
    }else {
      try {
          const response = await fetch(
              `http://ltin1158041:8081/_api/web/lists/GetBytitle('PasswordDB')/items`,
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json;odata=verbose",
                      Accept: "application/json;odata=verbose",
                  },
                  body: JSON.stringify(listItemData),
              }
          );
  
          if (response.ok) {
            
              navigate("/");
              toast.success("Data saved successfully!");
              
          } else {
              throw new Error("Failed to save data to the backend.");
          }
      } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred while saving data.");
      }

    }
};
 


  const onTextChange = (val: string, key: keyof FormData) => {
    setFormData({ ...formData, [key]: val });
  };

  const renderFields = () => {
    switch (selectedCategory) {
      case "bankAccount":
        return (
          <>
             <div className="form-group">
              <label htmlFor="Url">Url:</label>
              <input required type="url" placeholder="https://example.com" 
              value={domainUrl}
              onChange={(e) => {
                onTextChange(e.target.value, "domainUrl");
              }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input required type="text" 
              value={username}
              onChange={(e)=>{
                onTextChange(e.target.value,"username");
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="Password_pin">Password:</label>
              <input
                required
                type="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
              <div className="form-group">
                <label htmlFor="Accountnumber">Account Number:</label>
                <input
                  required
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    onTextChange(e.target.value, "accountNumber");
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ifscNumber">IFSC Code:</label>
              <input required 
              type="text"  
               value={ifscCode}
               onChange={(e) => {
                 onTextChange(e.target.value, "ifscCode");
               }}/>
            </div>
            <div className="form-group">
              <label htmlFor="transctionPassword">Transaction Password:</label>
              <input required type="password" id="transctionPassword" name="transctionPassword" 
               value={ transactionpassword}
               placeholder="Example@123"
               onChange={(e) => {
                 onTextChange(e.target.value, "transactionpassword");
               }}
              />
            </div>
          </>
        );
      case "socialMedia":
        return (
          <>
              <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                id="Url"
                name="Url"
                placeholder="https://example.com"
                value={domainUrl}
                onChange={(e) => {
                  onTextChange(e.target.value, "domainUrl");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
                value={username}
                onChange={(e) => {
                  onTextChange(e.target.value, "username");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
          </>
        );
      case "atm":
        return (
          
            <>
            <div className="form-group">
              <label htmlFor="password">Pin:</label>
              <input
                required
                type="password"
                pattern="[0-9]{4}"
                value={password}
                placeholder="pin must be 4 digit"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
          
          </>
        );
      case "otts":
        return (
          <>
            <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                placeholder="https://example.com"
                value={formData.domainUrl}
                onChange={(e) => {
                  onTextChange(e.target.value, "domainUrl");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input required type="text" 
              value={username}
              onChange={(e)=>{
                onTextChange(e.target.value,"username");
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  
  const { domainName, domainUrl, password, username, accountNumber, ifscCode, transactionpassword } = formData;
  console.log(id)
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Category:</label>
          <select
            className="select1"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="bankAccount">Banking Details</option>
            <option value="socialMedia">Social Media</option>
            <option value="atm">ATMs Details</option>
            <option value="otts">OTTs Platform</option>
          </select>
        </div>
        {renderFields()}
        <div className="form-group">
          <label htmlFor="Domain">Name:</label>
          <input
            type="text"
            value={domainName}
            onChange={(e) => onTextChange(e.target.value, "domainName")}
          />
        </div>
        <div className="buttons-container">
          <LdButton type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </LdButton>
          <LdButton type="submit" className="submit-button">
            { id!=="Form" ? 'Update': 'Add'}
          </LdButton>

        </div>
      </form>
      
    <ToastContainer/>
    </div>
  );
};

export default AddEditForm;
