const visibleStatus = ['entering', 'entered'];
export const isVisible = status => visibleStatus.includes(status);
export const isHidden = status => !visibleStatus.includes(status);
export const reflow = node => node && node.offsetHeight;