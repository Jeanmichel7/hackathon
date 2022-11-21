import React, { Component } from "react";
import axios from "axios";

// export default function PostForm() {
//   const [data, setData] = React.useState({
//     userId: "",
//     title: "",
//     body: "",
//     res: {},
//   });

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("https://jsonplaceholder.typicode.com/posts", data)
//       .then((res) => {
//         setData({ ...data, res: res.data });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="userId"
//             value={data.userId}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="title"
//             value={data.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="body"
//             value={data.body}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         <p>{data.res.id}</p>
//         <p>{data.res.userId}</p>
//         <p>{data.res.title}</p>
//         <p>{data.res.body}</p>
//       </div>
//     </div>
//   );
// }




class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      title: "",
      body: "",
      res: {}
    };
  }


  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault(); // avoid page refresh
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", this.state);
    console.log("res : ", res);

    if (res.status === 201) {
      console.log("Post created successfully");
      this.setState({ res: res.data });
      // this.displayRes()
    }
  };


  displayForm() {
    const { userId, title, body } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="body"
              value={body}
              onChange={this.changeHandler}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div>
          <p> Here id : { this.res.id } </p>
          <p> Here userId : { this.res.userId } </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.displayForm()}
        {/* <p> id : {this.state.res.data.id}</p> */}
      </div>
    );
  }
}

export default PostForm;