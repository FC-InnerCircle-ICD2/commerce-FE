const Footer = () => {
  const menuItems = ['이용약관', '개인정보처리방침', '주의사항', '입점안내'];

  return (
    <footer className="w-full bg-gradient-to-b from-[#E2EBF2] to-[#D9D9D9] py-9">
      <div className="container mx-auto px-4">
        <div className="relative text-center">
          <img
            src="/assets/logo.png"
            alt="감성카트"
            className="w-24 h-auto mx-auto mb-8 tablet:mb-0 tablet:absolute tablet:inset-y-2 tablet:right-0"
          />
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="text-xs">{menuItems.join(' | ')}</div>
          </div>
          <p className="mt-4 text-xs">Copyright team 감성개발자들. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
