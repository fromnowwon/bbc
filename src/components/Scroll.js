import React, { useState, useEffect } from "react";
import contents from "../static/data/contents";
import { connect } from "react-redux";

const Scroll = (props) => {
	const [stepEle, setStepEle] = useState(document.querySelectorAll(".step"));
	const [graphicEle, setGraphicEle] = useState(
		document.querySelectorAll(".graphic")
	);
	const [layoutEle, setLayoutEle] = useState(
		document.querySelectorAll(".layout")
	);
	const [frame, setFrame] = useState(document.querySelector(".frame"));
	const [currentGraphic, setCurrentGraphic] = useState(graphicEle[0]);
	const [data, setData] = useState(contents);
	const [ioIndex, setIoIndex] = useState(0);
	const imgUrl = process.env.PUBLIC_URL + "/images/";

	const pushPhrase = (data) => {
		const stepEle = document.querySelectorAll(".step");
		data.map((step, idx) => {
			if (!step.image) {
				console.log(`${idx} step 문장 없음`);
				return;
			}
			step.phrase.forEach((ph) => {
				const $bubble = document.createElement("div");
				$bubble.className = "bubble";

				for (let j = 0; j < ph.length; j++) {
					const $span = document.createElement("span");
					$span.append(ph[j]);
					$bubble.append($span);
				}
				stepEle[idx].append($bubble);
			});
		});

		stepEle.forEach((ele, idx) => {
			if (ele.getElementsByTagName("span").length === 0) {
				ele.classList.add("hidden");
			}
		});
	};

	const pushImg = (data) => {
		const $graphic = document.querySelectorAll(".graphic");
		data.map((step, idx) => {
			if (!step.image) {
				console.log(`${idx} step 이미지 없음`);
				return;
			}
			step.image.forEach((name) => {
				const $img = document.createElement("img");
				$img.src = imgUrl + name;
				$graphic[idx].append($img);
			});
		});
	};

	const activate = () => {
		currentGraphic.classList.add("visible");
	};

	const inactivate = () => {
		for (let i = 0; i < graphicEle.length; i++) {
			graphicEle[i].classList.remove("visible");
		}
	};

	const observer = () => {
		const io = new IntersectionObserver((entries, observer) => {
			// 해당 요소의 data-index값 가져오기
			setIoIndex(parseInt(entries[0].target.dataset.index));
		});

		setCurrentGraphic(stepEle[ioIndex]);

		// 각 step을 관찰 대상으로 지정
		for (let i = 0; i < stepEle.length; i++) {
			io.observe(stepEle[i]);
		}
	};

	const frameEffect = () => {
		setFrame(document.querySelector(".frame"));
	};

	const layoutHandler = () => {
		const $layout__list = document.querySelector(".layout__list");
		setLayoutEle(document.querySelectorAll(".layout"));
		if (layoutEle && layoutEle.length > 0) {
			let currentIdx = parseInt(currentGraphic.dataset.index);

			$layout__list.querySelector(".layout___step18").dataset.action =
				"slip";

			for (let i = 0; i < layoutEle.length; i++) {
				layoutEle[i].classList.remove("visible", "action__slip");
			}

			if (data[currentIdx].layout && data[currentIdx].layout.length > 0) {
				document
					.querySelector(`.layout___step${currentIdx}`)
					.classList.add("visible");
			}

			if (2 < currentIdx && currentIdx <= 4) {
				$layout__list
					.querySelector(".layout___step3")
					.classList.add("visible");
			}

			if (17 < currentIdx && currentIdx <= 20) {
				$layout__list
					.querySelector(".layout___step18")
					.classList.add("visible");
			}

			if (19 <= currentIdx && currentIdx < 22) {
				$layout__list
					.querySelector(".layout___step18")
					.classList.add("action__slip");
				$layout__list
					.querySelector(".layout___step18")
					.querySelector(
						"img"
					).src = `${imgUrl}isometric-house-furniture-grey.png`;
			}
		}
	};

	const scrollEvent = () => {
		let step;
		let boundingRect;

		layoutHandler();

		// 스크롤 이벤트를 모든 객체에 계속 실행하지 말고 현재, 앞, 뒤 객체만 실행되도록
		for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
			step = stepEle[i];

			// 첫번째 step element일 경우 -1이 되니까 제외
			if (!step) continue;

			boundingRect = step.getBoundingClientRect();

			if (
				boundingRect.top > window.innerHeight * 0.1 &&
				boundingRect.top < window.innerHeight * 0.8
			) {
				inactivate();
				setCurrentGraphic(graphicEle[step.dataset.index]);
				activate();
			}
		}
	};

	const checkHandler = () => {
		console.log(props.state[0].animation);
		const $label = document.querySelector(".toggle__label");
		if (props.state[0].animation) {
			props.dispatch({ type: "애니메이션 끄기" });
			$label.innerHTML = "애니메이션 끄기";

			document.querySelector(".layout___step18").classList.add("stop");

			for (let i = 0; i < graphicEle.length; i++) {
				if (graphicEle[i].dataset.index === "5") {
					graphicEle[i].querySelector("img").src = `${imgUrl}5b.png`;
				} else if (graphicEle[i].dataset.index === "11") {
					graphicEle[i].querySelector("img").src = `${imgUrl}9b.png`;
				}
			}
		} else {
			props.dispatch({ type: "애니메이션 켜기" });
			$label.innerHTML = "애니메이션 켜기";

			document.querySelector(".layout___step18").classList.remove("stop");

			for (let i = 0; i < graphicEle.length; i++) {
				if (graphicEle[i].dataset.index === "5") {
					graphicEle[i].querySelector(
						"img"
					).src = `${imgUrl}5b_optimised.gif`;
				} else if (graphicEle[i].dataset.index === "11") {
					graphicEle[i].querySelector(
						"img"
					).src = `${imgUrl}9b_optimised.gif`;
				}
			}
		}
	};

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				behavior: "smooth",
				top: 0,
				left: 0,
			});
		});
	}, []);

	useEffect(() => {
		if (currentGraphic && currentGraphic.classList.contains("mask")) {
			if (frame) {
				frame.style.opacity = "1";
			}
		} else if (
			currentGraphic &&
			!currentGraphic.classList.contains("mask")
		) {
			if (frame) {
				frame.style.opacity = "0";
			}
		}
	}, [frameEffect]);

	useEffect(() => {
		setStepEle(document.querySelectorAll(".step"));
		setGraphicEle(document.querySelectorAll(".graphic"));
	}, []);

	useEffect(() => {
		observer();
	}, [stepEle, graphicEle]);

	useEffect(() => {
		setCurrentGraphic(graphicEle[0]);
	}, [graphicEle]);

	useEffect(() => {
		pushPhrase(data);
		pushImg(data);
	}, [data]);

	useEffect(() => {
		window.addEventListener("scroll", scrollEvent);
		return () => {
			window.removeEventListener("scroll", scrollEvent);
		};
	}, [observer]);

	useEffect(() => {
		window.addEventListener("scroll", frameEffect);
		return () => {
			window.removeEventListener("scroll", frameEffect);
		};
	}, []);

	return (
		<section className="scroll-section">
			<div className="toggle-container">
				<label id="animation-toggle" className="toggle__switch">
					<input
						type="checkbox"
						checked={props.state[0].animation}
						onChange={checkHandler}
					/>
					<span className="toggle__slider"></span>
					<span className="toggle__label">애니메이션 켜기</span>
				</label>
			</div>
			<div className="scroll__graphic">
				<div className="graphic__list">
					{data.map((item, idx) => {
						return idx === 0 ? (
							<div
								className="graphic visible"
								data-index={idx}
								key={idx}
							></div>
						) : (3 <= idx && idx < 15) || 19 <= idx ? (
							<div
								className="graphic graphic__half right mask"
								data-index={idx}
								key={idx}
							></div>
						) : (
							<div
								className="graphic"
								data-index={idx}
								key={idx}
							></div>
						);
					})}
				</div>
				<div className="layout__list">
					{data.map((layout, idx) => {
						return (
							data[idx].layout && (
								<div
									className={`layout layout___step${idx}`}
									key={idx}
								>
									<img
										src={`${imgUrl}layout-step${idx}.jpg`}
										alt=""
									/>
								</div>
							)
						);
					})}
					<div className="layout layout___step18 full">
						<img
							src={`${imgUrl}isometric-house-furniture-grey.png`}
							alt=""
						/>
					</div>
				</div>
				<div className="frame">
					<img
						src={`${imgUrl}illustration_transparency_with_border.svg`}
						alt=""
					/>
				</div>
			</div>
			<div className="scroll__text">
				{data.map((item, idx) => {
					return (
						<div className="step" data-index={idx} key={idx}></div>
					);
				})}
			</div>
		</section>
	);
};

function setProps(state) {
	return {
		state: state,
	};
}

export default connect(setProps)(Scroll);
