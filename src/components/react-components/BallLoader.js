import React from 'react';
import { motion } from 'framer-motion';
import './ballStyle.css';

const loaderVariants = {
	animation: {
		x: [ -20, 20 ],
		y: [ 0, -30 ],
		transition: {
			x: {
				yoyo: Infinity,
				duration: 0.5
			},
			y: {
				yoyo: Infinity,
				duration: 0.25,
				ease: 'easeOut'
			}
		}
	}
};

const BallLoader = () => {
	return (
		<div className="marginTop">
			<motion.div className="ball-loader" variants={loaderVariants} animate="animation" />
		</div>
	);
};

export default BallLoader;
