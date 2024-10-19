import { useState } from 'preact/hooks'
import { Helmet } from 'react-helmet-async'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export const Label = () => {
  const [images, setImages] = useState([])
  const [labels, setLabels] = useState({})
  const [labelInput, setLabelInput] = useState('')

  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    setImages((prevImages) => [...prevImages, ...files])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleLabelChange = (event, image) => {
    const newLabel = event.target.value
    setLabels((prevLabels) => ({ ...prevLabels, [image.name]: newLabel }))
  }

  const handleZip = async () => {
    const zip = new JSZip()
    const labelGroups = {}

    images.forEach((image) => {
      const label = labels[image.name] || 'unlabeled'
      if (!labelGroups[label]) {
        labelGroups[label] = []
      }
      labelGroups[label].push(image)
    })

    for (const label in labelGroups) {
      const folder = zip.folder(label)
      labelGroups[label].forEach((image) => {
        folder.file(image.name, image)
      })
    }

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'labeled_images.zip')
  }

  return (
    <>
      <Helmet>
        <title>Label Images</title>
      </Helmet>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <p>Drag and drop images here</p>
      </div>
      <div>
        {images.map((image) => (
          <div key={image.name}>
            <img src={URL.createObjectURL(image)} alt={image.name} width="100" />
            <input
              type="text"
              value={labels[image.name] || ''}
              onChange={(event) => handleLabelChange(event, image)}
              placeholder="Enter label"
            />
          </div>
        ))}
      </div>
      <button onClick={handleZip}>Download Labeled Images</button>
    </>
  )
}
