import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
// import styles from '../styles/Home.module.css'
// Import Swiper React components
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <div id="wrapper" className="main">
      <header>
        <div className="inner">
          <h1><span className="logo">MEDI:GATE</span></h1>
          <div className="header-controls">
            <button type="button" className="btn-icon btn-srch"><i className="medi medi-search"></i></button>
            <button type="button" className="btn-icon btn-menu"><i className="medi medi-fullmenu"></i></button>
          </div>
        </div>
        <nav className="lnb">
          <div className="swiper">
            <Swiper
                tag={'ul'}
                // className="swiper-wrapper"
                spaceBetween={20}
                slidesPerView={'auto'}
                freeMode={true}
                pagination={{
            el: '.swiper-pagination'}
                }
                createElements={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide tag={'li'} className="swiper-slide current"><a href="#">홈</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">커뮤니티</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">초빙정보</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">임대분양</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">설문조사</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">뉴스</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">의학정보</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">웹심포지움</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">개원올인원</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">연봉인덱스</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">처방정보</a></SwiperSlide>
              <SwiperSlide tag={'li'} className="swiper-slide"><a href="#">입지분석</a></SwiperSlide>
            </Swiper>
          </div>
        </nav>
      </header>
      <main id="container">
        <section className="ad-banner-wrap">
          <div className="ad-banner">
            <Link href="#" target="_blank"><Image src="/assets/images/banner/banner_ad.jpg" width={720} height={160} alt=""/></Link>
          </div>
        </section>
        <section className="main-card-section bg-white">
          <div className="tab-wrap">
            <div className="tab-menu">
              <ul>
                <li className="active">
                  <button type="button" >웹심포지움</button>
                </li>
                <li>
                  <button type="button" >의학정보</button>
                </li>
                <li className="dot2">
                  <button type="button" >연수강좌</button>
                </li>
                <li className="dot2">
                  <button type="button" >설문조사</button>
                </li>
              </ul>
            </div>
            <div className="tab-cont web-symposium">
              <div className="swiper">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    pagination={{ el: `.swiper-pagination.test2` }}
                    slidesPerView={'auto'}
                    freeMode={true}
                    onSlideChange={() => console.log('slide change2')}
                    onSwiper={(swiper) => console.log(swiper+"..")}
                >
                  <SwiperSlide className="swiper-slide">
                    <div className="card-item">
                      <div className="img-area"><Image src="https://picsum.photos/id/140/300" width={300} height={300} alt=""/></div>
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <button type="button" className="btn-alarm"><i className="medi medi-notice"></i></button>
                        <h3>[통역제공]What is the first Oral GLP-1RA in diabetes Management</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>2022.08.18(목) / 19:00~20:00</em></span></li>
                          <li><span><strong>연자</strong><em>좌장 이준교수, 윤재용교수, 윤재용교수, 윤재용교수</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="card-item">
                      <div className="img-area"><Image src="https://picsum.photos/id/110/300" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <button type="button" className="btn-alarm"><i className="medi medi-notice"></i></button>
                        <h3>전문의가 들려주는 효과적인 이상지질혈증 치료 전략과 생활 습관</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>2022.08.18(목) / 19:00~20:00</em></span></li>
                          <li><span><strong>연자</strong><em>좌장 이준교수, 윤재용교수, 윤재용교수, 윤재용교수</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-pagination test2" ></div>
                </Swiper>
              </div>
            </div>
            <div className="tab-cont medical-info">
              <div className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card-item">
                      <div className="img-area"><Image src="https://picsum.photos/id/130/300" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <button type="button" className="btn-alarm"><i className="medi medi-notice"></i></button>
                        <h3>알리톡과 발트렉스(GSK)</h3>
                        <p>
                          GSK는 연구개발 중심의 헬스케어 기업으로 피부과
                        </p>
                        <span className="date">2022-11-17 (목)</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item">
                      <div className="img-area"><Image src="https://picsum.photos/id/131/300" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <button type="button" className="btn-alarm"><i className="medi medi-notice"></i></button>
                        <h3>탈모 아카데미(GSK)</h3>
                        <p>
                          GSK는 연구개발 중심의 헬스케어 기업으로 피부과
                        </p>
                        <span className="date">2022-11-17 (목)</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item">
                      <div className="img-area"><Image src="https://picsum.photos/id/132/300" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <button type="button" className="btn-alarm"><i className="medi medi-notice"></i></button>
                        <h3>알리톡과 발트렉스(GSK)</h3>
                        <p>
                          GSK는 연구개발 중심의 헬스케어 기업으로 피부과
                        </p>
                        <span className="date">2022-11-17 (목)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="tab-cont training">
              <div className="swiper swiper-grid">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <h3>[필수2점/TPI이수증] 대한신경외과 의사회 제34차 추계 학술대회</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span></li>
                          <li><span><strong>주관</strong><em>KMMA</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <span className="badge d-day">D-7</span>
                        <h3>제24회 대한일차진료학회 통증아카데미 (목, 어깨, 상지)</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span></li>
                          <li><span><strong>주관</strong><em>KMMA</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <span className="badge d-day">D-3</span>
                        <h3>[필수2점/TPI이수증] 대한신경외과 의사회 제34차 추계 학술대회</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span></li>
                          <li><span><strong>주관</strong><em>KMMA</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <span className="badge d-day">D-7</span>
                        <h3>제24회 대한일차진료학회 통증아카데미 (목, 어깨, 상지)</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span></li>
                          <li><span><strong>주관</strong><em>KMMA</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <span className="badge d-day">D-7</span>
                        <h3>제24회 대한일차진료학회 통증아카데미 (목, 어깨, 상지)</h3>
                        <ul>
                          <li><span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span></li>
                          <li><span><strong>주관</strong><em>KMMA</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="tab-cont survey">
              <div className="swiper swiper-grid row3">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <h3><span className="badge">진행중</span> 호흡기 질환 예방 백신에 대한...</h3>
                        <ul>
                          <li>
                            <span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span><span><em>선착순 40명 마감</em></span>
                          </li>
                          <li><span><strong>소요시간</strong><em>약 40분</em></span><span><em>8,000포인트 지급</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <h3><span className="badge">진행중</span> 호흡기 질환 예방 백신에 대한...</h3>
                        <ul>
                          <li>
                            <span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span><span><em>선착순 40명 마감</em></span>
                          </li>
                          <li><span><strong>소요시간</strong><em>약 40분</em></span><span><em>8,000포인트 지급</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <h3><span className="badge disabled">정료</span> 호흡기 질환 예방 백신에 대한...</h3>
                        <ul>
                          <li>
                            <span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span><span><em>선착순 40명 마감</em></span>
                          </li>
                          <li><span><strong>소요시간</strong><em>약 40분</em></span><span><em>8,000포인트 지급</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <h3><span className="badge">진행중</span> 호흡기 질환 예방 백신에 대한...</h3>
                        <ul>
                          <li>
                            <span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span><span><em>선착순 40명 마감</em></span>
                          </li>
                          <li><span><strong>소요시간</strong><em>약 40분</em></span><span><em>8,000포인트 지급</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-item only-txt">
                      <div className="txt-area">
                        <h3><span className="badge">진행중</span> 호흡기 질환 예방 백신에 대한...</h3>
                        <ul>
                          <li>
                            <span><strong>일시</strong><em>10.29(토) 17:00~21:00</em></span><span><em>선착순 40명 마감</em></span>
                          </li>
                          <li><span><strong>소요시간</strong><em>약 40분</em></span><span><em>8,000포인트 지급</em></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ad-banner-wrap mg-b-4u">
          <div className="ad-banner">
            <Link href="#" target="_blank">
              <Image src="/assets/images/banner/banner_ad.jpg" alt="" width={720} height={200}/>
            </Link>
          </div>
        </section>

        <section className="latest-news bg-white">
          <div className="title-area">
            <h2><span className="logo">MEDI:GATE</span><em className="badge-news">News</em></h2>
          </div>
          <div className="latest-news-header">
            <div className="img-area"><Image  src="https://picsum.photos/id/178/300" alt="" width={300} height={300}/></div>
            <div className="txt-area">
              <h3>“성분명 처방” 주장하려면 차라리 의약분업 폐기폐기폐기</h3>
              <p>
                대개협·소청과의사회·서울시의사회 등, 생동성시험의 불완전성으로 약화사고 우려‧의사 처방권 처방권 침범처방권 침범침범
              </p>
            </div>
          </div>
          <div className="latest-news-cont">
            <ul>
              <li><a href="#">정기석 단장 “코로나19 출구 전략 준비 시작할 때이다.</a></li>
              <li><a href="#">정원 50명 미만 미나의대 18개교...기존 의대 교육 내실강화 내실강화내실강화</a></li>
              <li><a href="#">의료데이터 활용 촉진? “무보상에 소극적인 병원과</a></li>
            </ul>
          </div>
        </section>

        <section className="invitation-info">
          <div className="title-area">
            <h2>맞춤 초빙정보</h2>
            <button type="button" className="btn-icon btn-more"><i className="medi medi-plus"></i></button>
          </div>
          <div className="card-list">
            <div className="swiper swiper-grid row3">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="card-item">
                    <div className="img-area"><Image  src="/assets/images/bi/bi_baruda.png" alt="" width={256} height={80}/></div>
                    <div className="txt-area">
                      <span className="badge d-day">D-3</span>
                      <h3>[수원/최고대우] 바르다정형외과에서 척척척척척척</h3>
                      <div className="location">
                        <span>경기</span><strong>바르다정형외과</strong>
                      </div>
                      <div className="info">
                        <ul>
                          <li>신경외과, 정형외과</li>
                          <li>봉직의 ( 1명, 정규직 )</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card-item">
                    <div className="img-area"><Image  src="/assets/images/bi/bi_medipium.png" alt="" width={256} height={80}/></div>
                    <div className="txt-area">
                      <span className="badge d-day">D-3</span>
                      <h3>[동탄메디피움] 내과, 가정의학과 선생님, 가정의학과 선생님</h3>
                      <div className="location">
                        <span>경기</span><strong>메디피움동탄의원</strong>
                      </div>
                      <div className="info">
                        <ul>
                          <li>신경외과, 정형외과</li>
                          <li>봉직의 ( 1명, 정규직 )</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card-item">
                    <div className="img-area"><Image  src="/assets/images/bi/bi_wonkwang.png" alt="" width={256} height={80}/></div>
                    <div className="txt-area">
                      <span className="badge d-day">D-3</span>
                      <h3>호흡기내과, 산부인과, 영상의학과 교수, 영상의학과 교수</h3>
                      <div className="location">
                        <span>경기</span><strong>원광대학교 산본병원</strong>
                      </div>
                      <div className="info">
                        <ul>
                          <li>신경외과, 정형외과</li>
                          <li>봉직의 ( 1명, 정규직 )</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card-item">
                    <div className="img-area"><Image  src="/assets/images/bi/bi_wonkwang.png" alt="" width={256} height={80}/></div>
                    <div className="txt-area">
                      <span className="badge d-day">D-3</span>
                      <h3>호흡기내과, 산부인과, 영상의학과 교수, 영상의학과 교수</h3>
                      <div className="location">
                        <span>경기</span><strong>원광대학교 산본병원</strong>
                      </div>
                      <div className="info">
                        <ul>
                          <li>신경외과, 정형외과</li>
                          <li>봉직의 ( 1명, 정규직 )</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card-item">
                    <div className="img-area"><Image  src="/assets/images/bi/bi_baruda.png" alt="" width={256} height={80}/></div>
                    <div className="txt-area">
                      <span className="badge d-day">D-3</span>
                      <h3>[수원/최고대우] 바르다정형외과에서 척척척척척척</h3>
                      <div className="location">
                        <span>경기</span><strong>바르다정형외과</strong>
                      </div>
                      <div className="info">
                        <ul>
                          <li>신경외과, 정형외과</li>
                          <li>봉직의 ( 1명, 정규직 )</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section className="recommend-rental bg-white">
          <div className="title-area">
            <h2>추천 임대분양</h2>
            <div className="tab-menu line">
              <ul>
                <li className="active">
                  <button type="button" >맞춤매물</button>
                </li>
                <li>
                  <button type="button" >My관심</button>
                </li>
              </ul>
            </div>
            <button type="button" className="btn-icon btn-more"><i className="medi medi-plus"></i></button>
          </div>
          <div className="tab-cont custom">
            <div className="img-list">
              <div className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/188/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border">양도</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/189/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border green">임대</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/190/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border green">임대</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/188/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border">양도</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
          <div className="tab-cont my">
            <div className="img-list">
              <div className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/125/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border green">임대</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/195/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border">양도</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/190/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border">양도</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card-img">
                      <div className="img-area"><Image  src="https://picsum.photos/id/188/400/580" alt="" width={300} height={300}/></div>
                      <div className="txt-area">
                        <div className="location"><span className="badge border">양도</span>대전 중구</div>
                        <h3>대전 중구 구도심 최고 최고 입지의 사거리 최고 최고 입지의 사거리</h3>
                        <p>임대보증금 6,000 만원 월 250만원 (협의가능)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="other-service-wrap">
          <div className="title-area">
            <h2>다른 서비스가 궁금하다면?</h2>
          </div>
          <div className="other-service">
            <h4>커뮤니티</h4>
            <ul>
              <li><a href="#"><span className="label">무찌마</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">여의도</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">가정의학과</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">에스테틱포럼</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">지구의</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">벼룩시장</span><i className="medi medi-arrow-right"></i></a></li>
            </ul>
            <h4>병원경영</h4>
            <ul>
              <li><a href="#"><span className="label">초빙정보</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">임대분양</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">H+LINK</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">메디칼데포</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">개원올인원</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">노무케어</span><i className="medi medi-arrow-right"></i></a></li>
            </ul>
            <h4>닥터게이트</h4>
            <ul>
              <li><a href="#"><span className="label">연봉인덱스</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">처방정보</span><i className="medi medi-arrow-right"></i></a></li>
              <li><a href="#"><span className="label">처방정보</span><i className="medi medi-arrow-right"></i></a></li>
            </ul>
          </div>
        </section>


        <section className="recommend-brand-wrap bg-white pd-b-13u">
          <div className="title-area">
            <h2>추천브랜드관</h2>
          </div>
          <div className="recommend-brand">
            <div className="img-area"><Image  src="/assets/images/bi/bi_eliquis.png" alt="" width={256} height={80}/></div>
            <div className="txt-area">
              <h3>엘리퀴스</h3>
              <p>아픽사반 성분의 非비타민K 길항제 경구용 항응고제</p>
            </div>
          </div>
        </section>


      </main>
      <footer>
        <button type="button" className="btn-icon btn-top" ><i
            className="medi medi-top"></i></button>
        <div className="footer-menu">
          <ul>
            <li><a href="#">로그아웃</a></li>
            <li><a href="#">전체서비스</a></li>
            <li><a href="#">PC버전</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#"><strong>개인정보처리방침</strong></a></li>
            <li><a href="#">커뮤니티 정책</a></li>
            <li><a href="#">고객센터</a></li>
          </ul>
        </div>
        <div className="footer-link">
          <a href="#" className="btn-text btn-round btn-white">광고문의 <i className="medi medi-arrow-right"></i></a>
        </div>
        <address>&copy;MEDIC&C, All Right Reserved.</address>
      </footer>
    </div>
  )
}
