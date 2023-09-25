import { getWindows } from './function';

const downLoad = (url: string,name:string) => {
  const win = getWindows();
  const link = win.document.createElement('a');

  link.href = url;
  link.style.display = 'none';
  link.download = name;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  win.document.body.removeChild(link);
};


export const downLoadUrl = (url: string,name:string) => {
  downLoad(url,name);
}

export const downLoadStream = (file: File) => {
  downLoad(URL.createObjectURL(file),file.name);
}
