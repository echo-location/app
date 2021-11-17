import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState(null);

  const submitFile = async (e) => {
    try {
      e.preventDefault();
      if (!file) {
        throw new Error("Select a file first!");
      }

      const payload = {
        name: "apricot",
        description: "A nice fruit.",
        location: "330 De Neve Dr",
      };
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("json", JSON.stringify(payload));
      console.log(formData.getAll("json"));
      await fetch(
        `http://localhost:8000/item/create?uid=6194d71644473bf5313e5015`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setURL(data.data.Location);
        });
      // handle success
    } catch (error) {
      // handle error
    }
  };

  return (
    <div>
      <form onSubmit={(e) => submitFile(e)}>
        <label>Upload file</label>
        <input type="file" onChange={(e) => setFile(e.target.files)} />
        <button type="submit">Send</button>
      </form>
      {url && <img src={url} />}
    </div>
  );
};

export default FileUpload;
