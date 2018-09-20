import mockjs from 'mockjs';
// import imockjs from 'imockjs';

const titles = [
  'Alipay',
  'Angular',
  'IZI Design',
  'IZI Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // IZI Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // IZI Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  'Mỗi ngày tôi chọn một niềm vui, chọn những bông hoa...',
  'Mỗi ngày tới trường là một ngày vui! ;)',
  'Trên bước đường thành công, không có dấu chân của kẻ lười biếng',
  'Có rất nhiều quán rượu, nhưng cô ấy lại chọn quán của tôi',
  'Ngày buồn tháng nhớ năm đau khổ, vương quốc cô đơn thế kỷ sầu',
];

const user = [
  'Đỗ Tiến Điệp',
  'Trần Thị Dung',
  'Đỗ Nhật Linh',
  'Đỗ Minh Thư',
  'Đỗ Tiến Dũng',
  'Diệp Thị Hoài Thu',
  'Đỗ Diệp Minh Nhật',
  'Đỗ Diệp Minh Anh',
  'Nguyễn Văn A',
  'Trần Văn B',
];

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        'Trong quá trình phát triển các sản phẩm trung gian, các thông số kỹ thuật thiết kế khác nhau và các phương pháp triển khai sẽ xuất hiện, nhưng thường có nhiều trang và thành phần tương tự nhau, và các thành phần tương tự này sẽ được tách thành một tập hợp các đặc tả tiêu chuẩn.',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '(Dân trí) - Ban Thường vụ Thành ủy Hà Nội vừa phân công ông Nguyễn Phi Thường (Chủ tịch HĐQT Trasenco) giữ chức Bí thư huyện Ứng Hòa, còn ông Dương Đức Tuấn - Chủ tịch quận Hoàn Kiếm nhận nhiệm vụ làm Bí thư quận quận này.        ',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: 'Daniel Đỗ',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: 'Đỗ Nhật Linh',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: 'Đỗ Minh Thư',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: 'Đây là nội dung mô tả thử nghiệm',
    updatedAt: new Date(),
    member: 'Khối chuyển động khoa học',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: 'Another test description',
    updatedAt: new Date('2017-07-24'),
    member: 'Khối phát triển công nghệ',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: 'Có rất nhiều quán rượu ở đây, nhưng cô ấy lại vào quán rượu của tôi',
    updatedAt: new Date(),
    member: 'Nhóm học sinh',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: 'Vào thời điểm đó tôi chỉ nghĩ về những gì tôi muốn và quên đi những gì tôi có',
    updatedAt: new Date('2017-07-23'),
    member: 'Lập trình viên',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: 'Mùa thu đã đến và mùa đông thì cũng chuẩn bị đến',
    updatedAt: new Date('2017-07-23'),
    member: 'Nhà thơ hâm',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: 'Cuộc sống muôn màu, đây là nội dung thử nghiệm',
    updatedAt: new Date('2017-07-23'),
    member: 'Sinh viên công nghệ',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: 'Tiến Điệp',
      avatar: avatars2[0],
    },
    group: {
      name: 'Thiết kế',
      link: 'http://github.com/',
    },
    project: {
      name: 'Công nghệ AI',
      link: 'http://github.com/',
    },
    template: 'Trong @{group} đã tạo project @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: 'Nhật Linh',
      avatar: avatars2[1],
    },
    group: {
      name: 'Thiết kế phần mềm',
      link: 'http://github.com/',
    },
    project: {
      name: 'Tháng tám mùa thu',
      link: 'http://github.com/',
    },
    template: 'Trong @{group} đã tạo project @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: 'Minh Thư',
      avatar: avatars2[2],
    },
    group: {
      name: 'Sao điện ảnh',
      link: 'http://github.com/',
    },
    project: {
      name: 'Đóng phim',
      link: 'http://github.com/',
    },
    template: 'Trong @{group} đã tạo project @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: 'Trần Dung',
      avatar: avatars2[4],
    },
    project: {
      name: 'Kiểm thử phần mềm',
      link: 'http://github.com/',
    },
    template: 'Cập nhật trạng thái @{project} thành release',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: 'ViTuocGia',
      avatar: avatars2[3],
    },
    project: {
      name: 'Lập trình web',
      link: 'http://github.com/',
    },
    comment: {
      name: 'Thử nghiệm',
      link: 'http://github.com/',
    },
    template: 'Trong @{project} đã gửi bình luận @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: 'Daniel Đỗ',
      avatar: avatars2[5],
    },
    group: {
      name: 'Giám đốc công nghệ',
      link: 'http://github.com/',
    },
    project: {
      name: 'Quản trị dự án',
      link: 'http://github.com/',
    },
    template: 'Trong nhóm @{group} đã tạo dự án mới @{project}',
  },
];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@string', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
};
