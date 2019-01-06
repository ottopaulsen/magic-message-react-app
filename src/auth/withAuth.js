import React from 'react';
import AuthContext from '../auth'


const withAuth = Component => {
    class WithAuth extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                user: 'pappa',
            };
        }

        componentDidMount() {
            //   this.listener = this.props.firebase.auth.onAuthStateChanged(
            //     authUser => {
            //       authUser
            //         ? this.setState({ authUser })
            //         : this.setState({ authUser: null });
            //     },
            //   );
            this.setState({ user: 'Otto P' })
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthContext.Provider value={this.state.user}>
                    <Component {...this.props} />
                </AuthContext.Provider>
            );
        }
    }
    return WithAuth;
};

export default withAuth;
