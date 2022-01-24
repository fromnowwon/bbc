const Header = (props) => {
	return (
		<header className="header" style={{ fontSize: "1rem" }}>
			<h1 className="headline">
				'재택근무의 일상화'... 코로나19가 바꿀 사무실의 미래
			</h1>
			<div className="time-stamp" style={{ margin: "0.875rem 0" }}>
				<ul>
					<li>
						<p>BBC 비주얼저널리즘 팀</p>
					</li>
					<li className="date">
						<p>2020년 8월 6일</p>
					</li>
					<li>
						<a href="https://www.bbc.com/korean/topics/c5j7v6x8qqwt">
							코로나바이러스
						</a>
					</li>
				</ul>
			</div>
			<div className="highlight-text">
				<p>
					신종 코로나바이러스 감염증(코로나19)도 진정되는 날이 올
					것이다. 종식될 수도 있다. 하지만 우리의 삶이 코로나19
					이전으로 돌아갈 수 있을지는 모르겠다. 코로나19 사태로
					건축가들은 우리가 사는 건물에 대해 다시 생각하고 있다.
				</p>
				<p>미래의 모습은 어떨까? 밑으로 스크롤 해보자.</p>
			</div>
		</header>
	);
};

export default Header;
