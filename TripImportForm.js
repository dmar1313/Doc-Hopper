import axios from 'axios'
import React, { useState } from 'react'
import Papa from 'papaparse'
import XLSX from 'xlsx'

const TripImportForm = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    let parsedData
    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        complete: (results) => {
          parsedData = results.data
        }
      })
    } else if (file.name.endsWith('.xlsx')) {
      const workbook = XLSX.readFile(file.path)
      const sheet_name_list = workbook.SheetNames
      parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    }
    const formData = new FormData()
    formData.append('tripFile', parsedData)
    try {
      const response = await axios.post('/your-api-endpoint-for-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('File uploaded successfully', response.data)
    } catch (error) {
      console.error('An error occurred while uploading the file', error)
    }
  }

  return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
  )
}

export default TripImportForm
