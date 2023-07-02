

export const uploadImages = (req, res) => {
    console.log(req.file);
    
    
    if (!req.file) {
      return res.status(400).send('No image files provided');
    }
    const fileName = req.file.filename;
    const fileUrl = `http://${req.headers.host}/uploads/articles/${fileName}`;
    console.log(fileUrl);
    return res.status(200).send({ message: 'Image uploaded successfully', imageUrl:fileUrl });
  };
  