export const familyData = [
  {
    id: 1,
    label: '祖父',
    children: [
      {
        id: 2,
        label: '父亲',
        children: [
          { id: 3, label: '我' },
          { id: 4, label: '妹妹' }
        ]
      },
      {
        id: 5,
        label: '叔叔',
        children: [
          { id: 6, label: '堂弟' }
        ]
      },
      {
        id: 7,
        label: '姑姑',
        children: [
          { id: 8, label: '表姐' },
          { id: 9, label: '表弟' }
        ]
      }
    ]
  },
  {
    id: 10,
    label: '外祖父',
    children: [
      {
        id: 11,
        label: '舅舅',
        children: [
          { id: 12, label: '表妹' }
        ]
      },
      {
        id: 13,
        label: '母亲',
        children: [
          { id: 14, label: '我' },
          { id: 15, label: '妹妹' }
        ]
      }
    ]
  },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: 16 + i,
    label: `祖父${i + 2}`
  }))
]