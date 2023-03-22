import React, {useRef, useEffect, useState} from "react";
import * as Yup from "yup";
import axios, { formToJSON } from "axios";
import Switch from 'react-switch';
import Apiurl from '../Apiurl';
import { v4 as uuidv4 } from 'uuid';


function Notice() {
    const [audience, setAudience] = useState("");
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeDescription, setNoticeDescription] = useState("");
    const [attachFiles, setAttachFiles] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const handleFileInputChange = (event) => {
      const files = event.target.files;
      setAttachFiles(Array.from(files));
    };


    const validationSchema = Yup.object().shape({
      audience: Yup.string().required("Target audience is required"),
      noticeTitle: Yup.string().required("Notice title is required"),
      noticeDescription: Yup.string().required("Notice description is required"),
      attachFiles: Yup.array()
        .nullable()
        .compact()
        .test(
          "fileSize",
          "File size too large",
          (value) => {
            if (!value) {
              return true;
            }
            const size = value.reduce((acc, file) => acc + file.size, 0);
            return size / 1024 / 1024 <= 10;
          }
        )
        .test(
          "fileType",
          "Unsupported file format",
          (value) => {
            if (!value) {
              return true;
            }
            const supportedTypes = [
              "application/zip",
              "application/xml",
              "application/xhtml+xml",
              "text/plain",
              "image/svg+xml",
              "application/rtf",
              "application/pdf",
              "image/jpeg",
              "image/png",
              "image/jpg",
              "audio/ogg",
              "application/json",
              "text/html",
              "image/gif",
              "text/csv",
            ];
            const types = value.map((file) => file.type);
            return types.every((type) => supportedTypes.includes(type));
          }
        )
        .transform((value, originalValue) => {
          if (originalValue === "") {
            return null;
          }
          return value;
        }),
    });

    const [errors, setErrors] = useState({});
 
    // const validateForm = async () => {
    //   try {
    //     await validationSchema.validate({
    //       audience,
    //       noticeTitle,
    //       noticeDescription,
    //       attachFiles,
    //     }, { abortEarly: false });
    //     return true;
    //   } catch (err) {
    //     const newErrors = {};
    //     err.inner.forEach(error => {
    //       newErrors[error.path] = error.message;
    //     });
    //     setErrors(newErrors);
    //     return false;
    //   }
    // };

    const validateForm = async () => {
      try {
        await validationSchema.validate({
          audience,
          noticeTitle,
          noticeDescription,
          attachFiles: attachFiles.length > 0 ? attachFiles : null, // check if attachFiles is an empty array
        }, { abortEarly: false });
        return true;
      } catch (err) {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        return false;
      }
    };



    // const createNotice = async (e) => {
    //     e.preventDefault();
    //     let formData = {
    //         notice_to: e.target.notice_to.value,
    //         notice_title: e.target.notice_title.value,
    //         notice_desc: e.target.notice_desc.value,
    //         files: e.target.files.value,
    //     };


    //     const isValid = await noticeSchema.isValid(formData);
    //     console.log(isValid);
    //     if (isValid) {

    //         axios.post(`${Apiurl}/multiple`, {
    //             notice_to: audience,
    //             notice_title: noticeTitle,
    //             notice_desc: noticeDescription,
    //             files: attachFiles,
    //         }, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //         console.log(formData);
    //     }
    // };

    //----------------------------------


        //     const files = fileRef?.current?.files;
        //     if (files) {
        //         const fileArr = Array.from(files);
        //         fileArr.forEach((file) => {
        //             formData.append("files", file);
        //         });
        // }


    //     e.preventDefault();
    //     const form = e.target;
    //     const data = formToJSON(form.elements);
    //     const formData = new FormData();
    //     const files = fileRef?.current?.files;
    //     if (files) {
    //         const fileArr = Array.from(files);
    //         fileArr.forEach((file) => {
    //             formData.append("files", file);
    //         });
    //     }
    //     formData.append("notice_to", data.notice_to);
    //     formData.append("notice_title", data.notice_title);
    //     formData.append("notice_desc", data.notice_desc);
    //     axios
    //         .post(`${Apiurl}/multiple`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // notice_to: audience,
    // notice_title: noticeTitle,
    // notice_desc: noticeDescription,
    // files: attachFiles,

    
    // const form = document.querySelector('form');
    // form.addEventListener('submit', (e) => {
        
    //     e.preventDefault();
    //     // Prevents HTML handling submission
    //     const notice_to = document.getElementById("audience");
    //     const notice_title = document.getElementById("title");
    //     const notice_desc = document.getElementById("noticeData");
    //     const files = document.getElementById("files");
    //     const formData = new FormData();
    //     // Creates empty formData object
    //     formData.append("notice_to", notice_to.value);
    //     formData.append("notice_title", notice_title.value);
    //     formData.append("notice_desc", notice_desc.value);

    //     // Appends value of text input
    //     for(let i =0; i < files.files.length; i++) {
    //         formData.append("files", files.files[i]);
    //     }
    //     // Appends value(s) of file input
    //     // Post data to Node and Express server:
    //     fetch(`${Apiurl}/multiple`, {
    //         method: 'POST',
    //         body: formData, // Payload is formData object
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log(data));
    // })

    
//"https://httpbin.org/anything"      `${Apiurl}/multiple`


// const handleUpload =(event) => {
//     setAttachFiles(event.target.files);
//     };

    // const send = event => {
    //     const data = new FormData();
    //     for(let i = 0; i < attachFiles.length; i++){
    //         // data.append(`attachFiles[${i}]`, attachFiles[0])
    //         data.append('myFieldName', attachFiles[i], attachFiles[i].name);
    //     }
    //     data.append("notice_to", audience);
    //     data.append("notice_title", noticeTitle);
    //     data.append("notice_desc", noticeDescription);

    //     axios.post(`${Apiurl}/multiple` , data)
    //       .then(res => console.log(res))
    //       .catch(err => console.log(err));
    //   };


    const send = async event => {
      event.preventDefault();
      const isValid = await validateForm();
      if (isValid) {
        const data = new FormData();
        const uniqueFileNames = [];
    
        for (let i = 0; i < attachFiles.length; i++) {
          const uniqueFileName = `${uuidv4()}_${attachFiles[i].name}`;
          uniqueFileNames.push(uniqueFileName);
          data.append('myFieldName', attachFiles[i], uniqueFileName);
        }
      
        data.append("notice_to", audience);
        data.append("notice_title", noticeTitle);
        data.append("notice_desc", noticeDescription);
        data.append("files", uniqueFileNames);
        data.append("backup", isChecked)
      
        // try {
        //   const res = await axios.post(`${Apiurl}/multiple`, data);
        //   const notice = await Notice.create({
        //     files: uniqueFileNames,
        //     notice_to: audience,
        //     notice_title: noticeTitle,
        //     notice_desc: noticeDescription
        //   });
        //   console.log(res);
        // } catch (err) {
        //   console.log(err);
        // }
        axios.post(`${Apiurl}/multiple` , data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      };
   
      }




    // const send = async event => {
    //   const data = new FormData();
    //   const uniqueFileNames = [];
    
    //   for(let i = 0; i < attachFiles.length; i++){
    //     const uniqueFileName = `${uuidv4()}_${attachFiles[i].name}`;
    //     uniqueFileNames.push(uniqueFileName);
    //     data.append('myFieldName', attachFiles[i], uniqueFileName);
    //   }
    
    //   data.append("notice_to", audience);
    //   data.append("notice_title", noticeTitle);
    //   data.append("notice_desc", noticeDescription);
    //   data.append("files", uniqueFileNames);
    
    //   // try {
    //   //   const res = await axios.post(`${Apiurl}/multiple`, data);
    //   //   const notice = await Notice.create({
    //   //     files: uniqueFileNames,
    //   //     notice_to: audience,
    //   //     notice_title: noticeTitle,
    //   //     notice_desc: noticeDescription
    //   //   });
    //   //   console.log(res);
    //   // } catch (err) {
    //   //   console.log(err);
    //   // }

    //   axios.post(`${Apiurl}/multiple` , data)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // };




  return (
    <div>
      <div className="row">
        <div className="col-sm-2"></div>

        <div className="col-sm-8 debox">
        <form action="#">
            <div className="mb-3 mt-3">
                <label htmlFor="audience" >Target Audience</label>
                <select className={`form-control ${errors.audience && "is-invalid"}`} id="audience" name="notice_to"  value={audience} onChange={(event) => {setAudience(event.target.value)}} >
                    <option value="" selected disabled hidden>Select Audience You Want To Cover</option>
                    <option value="5">All</option>
                    <option value="2">Staff</option>
                    <option value="3">Teacher</option>
                    <option value="4">Student</option>
                </select>

                {errors.audience && (
                  <div className="badge rounded-pill text-bg-danger">{errors.audience}</div>
                  )}
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="title" >Notice Title</label>
                <input type="text" id="title" className={`form-control ${errors.noticeTitle && "is-invalid"}`} name="notice_title" placeholder="Enter Title" value={noticeTitle} onChange={(event) => {setNoticeTitle(event.target.value)}} />
                {errors.noticeTitle && (
                    <div className="badge rounded-pill text-bg-danger">{errors.noticeTitle}</div>
                  )}
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="noticeData" >Notice Description</label>
                {/* <input type="text" className="form-control" id="noticeData" name="notice_desc" placeholder="Enter Title" /> */}
                <textarea id="noticeData" className={`form-control ${errors.noticeDescription && "is-invalid"}`} name="notice_desc" placeholder="Enter Title" rows="3" onChange={(event) => {setNoticeDescription(event.target.value)}}></textarea>
                {errors.noticeDescription && (
                  <div className="badge rounded-pill text-bg-danger">{errors.noticeDescription}</div>
                )}
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="files">Attachments</label>
                <input type="file" className={`form-control ${errors.attachFiles && "is-invalid"}`} multiple onChange={handleFileInputChange} />

                <div className="d-flex align-items-center mt-2 ms-1 ps-0">
                <Switch
                  checked={isChecked}
                  onChange={value => setIsChecked(value)}
                />
                <label className="form-check-label ms-2" for="flexSwitchCheckChecked">Cloud Backup</label>
                </div>
                {errors.attachFiles && (
                  <div className="badge rounded-pill text-bg-danger">{errors.attachFiles}</div>
                )}

                <div className="form-files">
                <small>File Supported : zip",
                "xml",
                "xhtml+xml",
                "plain",
                "svg+xml",
                "rtf",
                "pdf",
                "jpeg",
                "png",
                "jpg",
                "ogg",
                "json",
                "html",
                "gif",
                "csv"</small>
                </div>

                <div className="form-files">
                <small>Max File Size : 10MB</small>
                </div>
            </div>


            {/* <div className="mb-3 mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div> */}
        </form>
        <div className="mb-3 mt-3">
                <button onClick={send} className="btn btn-primary">Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Notice



