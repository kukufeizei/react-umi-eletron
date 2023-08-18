export const getBase64Type = (type: string) => {
  switch (type) {
    case 'txt':
      return 'data:text/plain;base64,';
    case 'doc':
      return 'data:application/msword;base64,';
    case 'docx':
      return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
    case 'xls':
      return 'data:application/vnd.ms-excel;base64,';
    case 'xlsx':
      return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    case 'pdf':
      return 'data:application/pdf;base64,';
    case 'pptx':
      return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,';
    case 'ppt':
      return 'data:application/vnd.ms-powerpoint;base64,';
    case 'png':
      return 'data:image/png;base64,';
    case 'jpg':
      return 'data:image/jpeg;base64,';
    case 'gif':
      return 'data:image/gif;base64,';
    case 'svg':
      return 'data:image/svg+xml;base64,';
    case 'ico':
      return 'data:image/x-icon;base64,';
    case 'bmp':
      return 'data:image/bmp;base64,';
  }
};

// 将完整的base64转换为blob
export const dataURLtoBlob = (dataurl: any) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

// 下载表格数据为 .csv文件
export const uploadTableData = (header: any, data: any, name: any) => {
  let str = header;
  const jsonData = data;
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      str += `${jsonData[i][key] + '\t'},`;
    }
    str += '\n';
  }
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement('a');
  link.href = uri;
  // 对下载的文件命名
  link.download = `${name}.csv`;
  link.click();
};
