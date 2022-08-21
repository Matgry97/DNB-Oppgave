import React from 'react';

const Title = (props) => {
	return <h1 className={props.style || 'h1'}>{props.children}</h1>;
};

export default Title;
