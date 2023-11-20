const initialCards = [
  {
    name: 'водичка)',
    link: 'https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: '="._."=',
    link: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fHww'
  },
  {
    name: 'мухомор',
    link: 'https://images.unsplash.com/photo-1605874575508-504999dcb8fb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'ягодки',
    link: 'https://images.unsplash.com/photo-1667285435809-20941120f9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fCVEMCVCQiVEMCVCNSVEMSU4MXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: '...',
    link: 'https://images.unsplash.com/photo-1670946789981-6e86ae8d0f43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVEMCVCRiVEMCVCMCVEMCVCQiVEMSU4QyVEMCVCQyVEMCVCMHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'meow',
    link: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2F0fGVufDB8fDB8fHww'
  },
  {
    name: 'лошадка',
    link: 'https://images.unsplash.com/photo-1577936861999-2ee541936e4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'ещё одна лошадка',
    link: 'https://images.unsplash.com/photo-1539808163380-beb256654c64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'замок',
    link: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'озеро',
    link: 'https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'flowers',
    link: 'https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'this was a Hobbit hole',
    link: 'https://images.unsplash.com/photo-1575735409309-e0ecb6088fcd?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: ')',
    link: 'https://plus.unsplash.com/premium_photo-1668723712387-d5076dae388e?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'boo...',
    link: 'https://images.unsplash.com/photo-1635604521676-04f4f46b60e2?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'тыктыктыковка',
    link: 'https://images.unsplash.com/photo-1573051056354-ac3efd32cd67?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: '(((',
    link: 'https://images.unsplash.com/photo-1699804368701-d52e876bf01a?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export { initialCards };