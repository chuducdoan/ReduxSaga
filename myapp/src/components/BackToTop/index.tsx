import { useEffect, useState } from 'react';
import * as S from './styles';
import { ArrowUpOutlined } from '@ant-design/icons';

const BackToTop = () => {
  const [isScroll, setIsScroll] = useState<any>(false);

  const handleScroll = (event: any) => {
    const position = window.pageYOffset;
    const isShow = position > 300;
    setIsScroll(isShow);
    // tranh loi xay ra khi muon huy mot su kien bat ky bang preventDefault()
    // cancelable de xem su kien nay co dc huy hay khong
    if (event.cancelable) event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <S.Container active={isScroll} onClick={clickToTop}>
      <ArrowUpOutlined />
    </S.Container>
  );
};

export default BackToTop;
