import React from 'react';
import './cloudinary.css';

class Image extends React.Component{
  state = {
    imageUrl: null,
    imageAlt: null,
  }

  handleImageUpload() {
    const imageFile = document.querySelector('input[type="file"]')
    const files = imageFile.files
    console.log('Image file', files[0])
    const formData = new FormData();
    formData.append('file', files[0]);
    // ykal59ul is from Clouodinary unsinged
    formData.append('upload_preset', 'ykal59ul');
    const options = {
        method: 'POST',
        body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch('https://api.Cloudinary.com/v1_1/djvlv6am0/image/upload', options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                imageUrl: res.secure_url,
                imageAlt: `An image of ${res.original_filename}`
            })
        })
        .catch(err => console.log(err));
  }

  render() {
    const { imageUrl, imageAlt } = this.state;

    return (
      <main className="App">
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>

            <button type="button" className="btn" onClick={this.handleImageUpload.bind(this)}>Submit</button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
          )}
        </section>
      </main>
    );
  }
}
export default Image;