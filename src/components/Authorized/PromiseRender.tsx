import React from 'react';
import { Spin } from 'antd';
import isEqual from 'lodash/isEqual';
import { isComponentClass } from './Secured';

export default class PromiseRender extends React.Component {
  state = {
    component: () => null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  shouldComponentUpdate = (nextProps: any, nextState: any) => {
    const { component } = this.state;

    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }

    if (nextState.component !== component) return true;
    return false;
  }; // set render Component : ok or error

  setRenderComponent(props: any) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
        return true;
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  } // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated

  checkIsInstantiation = (target: any) => {
    if (isComponentClass(target)) {
      const Target = target;
      return (props: any) => <Target {...props} />;
    }

    if (React.isValidElement(target)) {
      return (props: any) => React.cloneElement(target, props);
    }

    return () => target;
  };

  render() {
    const { component: Component } = this.state;
    const { ...rest } = this.props;
    return Component ? (
      //@ts-ignore
      <Component {...rest} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
