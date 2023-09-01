import React, { FC, ReactNode } from 'react';

const Loader: FC<{ show: boolean; icon: ReactNode; spin?: boolean }> = ({ show, icon, spin = false }) => {
	if (!show) return null;
	return (
		<div
			className={`animate-svg-stereo z-[-1] block m-auto absolute top-[20px] right-[50px] ${spin && 'animate-spin'}`}
		>
			{icon}
		</div>
	);
};

export default Loader;
