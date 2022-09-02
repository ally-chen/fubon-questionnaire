export const categoryList = [
  {
    key: 'singleText',
    text: '單行文字',
    insertChildren: {
      children: []
    }
  },
  {
    key: 'multipleText',
    text: '多行文字',
    insertChildren: {
      children: []
    }
  },
  {
    key: 'singleSelect',
    text: '單選題',
    insertChildren: {
      children: [{ label: '', includeInput: false }]
    }
  },
  {
    key: 'multipleSelect',
    text: '多選題',
    insertChildren: {
      children: [{ label: '', includeInput: false }]
    }
  },
  {
    key: 'number',
    text: '數字題',
    insertChildren: {
      children: []
    }
  },
  {
    key: 'rating',
    text: '星級評分',
    insertChildren: {
      children: [{ label: '5' }]
    }
  },
  {
    key: 'title',
    text: '分類標題',
    insertChildren: {
      children: []
    }
  },
  {
    key: 'matrix',
    text: '矩陣題',
    insertChildren: {
      children: [{ label: '' }],
      children2: [{ label: '' }]
    }
  },
];
