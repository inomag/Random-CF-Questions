import React, { Component } from "react";
import Lottie from "react-lottie";
import fetchingProblems from "../../Lotties/fetchingProblems.json";
import serverError from "../../Lotties/serverError.json";
import Typography from "@material-ui/core/Typography";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: fetchingProblems,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class LoadingAnim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading? this.props.loading:true,
        error: this.props.error?this.props.error:false,
        message: this.props.message? this.props.message :"Loading Data...",
    };
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.error !== prevProps.error) {
            lottieOptions.animationData = serverError;
            this.setState({ error: this.props.error,message: "Server Error Encounterd" });
        }
    }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
                transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
            <Lottie options={lottieOptions} height={350} width={350} />
            <Typography
                variant="body1"
                style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "roboto",
                    marginTop: "10px",
                    }}
                >
                    {this.state.message}
                </Typography>
        </div>
        );
    }
     
}

export default LoadingAnim;