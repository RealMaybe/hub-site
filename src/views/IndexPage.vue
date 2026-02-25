<template>
    <section class="under-construction">
        <header>
            <h1>🎨 嘿，你来得有点早哦！</h1>
            <p class="subtitle">这个充满奇思妙想的小角落还在我的工作室里打磨呢～</p>
        </header>

        <div class="content">
            <div class="message-block">
                <p>它需要一点时间才能闪亮登场✨</p>
            </div>

            <div class="action-block">
                <p class="action-title">现在，何不去我的<b>大本营</b>逛逛？</p>
                <div class="main-site-link">
                    <a href="https://www.realmaybe0429.space/index" class="cta-button">
                        <span class="arrow">👉</span>
                        <span class="button-text">点此前往：RealMaybe 个人网站</span>
                        <span class="arrow">👈</span>
                    </a>
                    <p class="action-note">保证让你不虚此行！</p>
                </div>
            </div>

            <div class="divider"></div>

            <div class="waiting-options">
                <p class="waiting-title">如果你愿意等我一下…</p>
                <div class="options">
                    <div class="option">
                        <span class="option-icon">📌</span>
                        <span class="option-text">可以<strong>收藏此页</strong></span>
                    </div>
                    <div class="option">
                        <span class="option-icon">👀</span>
                        <span class="option-text">或者<strong>关注我</strong></span>
                    </div>
                </div>
                <p class="waiting-note">等我完工了立刻来告诉你！</p>
            </div>

            <div class="divider"></div>

            <div class="closing-message">
                <p class="thank-you">感谢你的提前到访！</p>
                <p class="come-again">可以过段时间再来看看哇～</p>
            </div>
        </div>
    </section>
</template>

<style scoped lang="less">
// 变量定义
@primary-color: #4a4af0;
@secondary-color: #ff6b9d;
@background-start: #f8f9ff;
@background-end: #f0f3ff;
@text-color: #333;
@subtext-color: #666;
@light-color: #fff;
@shadow-color: rgba(0, 0, 150, 0.08);
@button-shadow: rgba(74, 74, 240, 0.3);
@divider-color: rgba(74, 74, 240, 0.2);
@hover-shadow: rgba(74, 74, 240, 0.4);

@border-radius: 20px;
@button-border-radius: 50px;
@option-border-radius: 12px;

@font-family: "Segoe UI", "Microsoft YaHei", sans-serif;

@max-width: 700px;
@mobile-breakpoint: 768px;

// 混合宏(Mixins)
.gradient-background() {
    background: linear-gradient(145deg, @background-start 0%, @background-end 100%);
}

.button-gradient() {
    background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 15%));
}

.button-hover-gradient() {
    background: linear-gradient(135deg, darken(@primary-color, 5%), lighten(@primary-color, 10%));
}

.divider-gradient() {
    background: linear-gradient(to right, transparent, @divider-color, transparent);
}

.transition-all(@duration: 0.3s) {
    transition: all @duration ease;
}

.box-shadow(@x: 0, @y: 10px, @blur: 30px, @color: @shadow-color) {
    box-shadow: @x @y @blur @color;
}

.button-shadow(@x: 0, @y: 5px, @blur: 15px, @color: @button-shadow) {
    box-shadow: @x @y @blur @color;
}

.button-hover-shadow(@x: 0, @y: 8px, @blur: 20px, @color: @hover-shadow) {
    box-shadow: @x @y @blur @color;
}

// 主样式
.under-construction {
    max-width: @max-width;
    margin: 2rem auto;
    padding: 2.5rem;
    border-radius: @border-radius;
    .gradient-background();
    .box-shadow();
    font-family: @font-family;
    color: @text-color;
    line-height: 1.6;

    header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: @primary-color;
            letter-spacing: -0.5px;
        }

        .subtitle {
            font-size: 1.2rem;
            color: @subtext-color;
            margin-bottom: 1.5rem;
        }
    }

    .content {
        .message-block {
            text-align: center;
            margin-bottom: 2.5rem;

            p {
                font-size: 1.3rem;
                color: darken(@subtext-color, 10%);
            }
        }

        .action-block {
            background-color: fade(@light-color, 70%);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
            border: 1px solid fade(@primary-color, 10%);

            .action-title {
                font-size: 1.4rem;
                margin-bottom: 1.5rem;
                color: @primary-color;

                b {
                    color: @secondary-color;
                }
            }

            .main-site-link {
                display: flex;
                flex-direction: column;
                align-items: center;

                .cta-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    .button-gradient();
                    color: @light-color;
                    padding: 1rem 2.5rem;
                    border-radius: @button-border-radius;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 1.2rem;
                    .transition-all();
                    .button-shadow();
                    margin-bottom: 1rem;
                    min-width: 350px;
                    text-align: center;

                    &:hover {
                        transform: translateY(-3px);
                        .button-hover-shadow();
                        .button-hover-gradient();
                    }

                    .arrow {
                        margin: 0 10px;
                        font-size: 1.3rem;
                    }

                    .button-text {
                        flex-grow: 1;
                    }
                }

                .action-note {
                    font-size: 1.1rem;
                    color: @subtext-color;
                    font-style: italic;
                }
            }
        }

        .divider {
            height: 1px;
            .divider-gradient();
            margin: 2.5rem 0;
        }

        .waiting-options {
            text-align: center;
            margin-bottom: 2rem;

            .waiting-title {
                font-size: 1.4rem;
                margin-bottom: 1.5rem;
                color: @primary-color;
            }

            .options {
                display: flex;
                justify-content: center;
                gap: 3rem;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;

                .option {
                    display: flex;
                    align-items: center;
                    padding: 0.8rem 1.5rem;
                    background-color: @light-color;
                    border-radius: @option-border-radius;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                    transition: transform 0.2s ease;

                    &:hover {
                        transform: translateY(-3px);
                    }

                    .option-icon {
                        font-size: 1.5rem;
                        margin-right: 0.8rem;
                    }

                    .option-text {
                        font-size: 1.1rem;
                    }
                }
            }

            .waiting-note {
                font-size: 1.1rem;
                color: @subtext-color;
            }
        }

        .closing-message {
            text-align: center;

            .thank-you {
                font-size: 1.5rem;
                font-weight: bold;
                color: @primary-color;
                margin-bottom: 0.8rem;
            }

            .come-again {
                font-size: 1.2rem;
                color: @subtext-color;
            }
        }
    }

    // 响应式设计
    @media (max-width: @mobile-breakpoint) {
        padding: 1.5rem;
        margin: 1rem;

        header h1 {
            font-size: 2rem;
        }

        .content {
            .action-block .main-site-link {
                .cta-button {
                    min-width: auto;
                    // width: 100%;
                    padding: 1rem 1.5rem;
                    font-size: 1.1rem;
                }
            }

            .waiting-options .options {
                flex-direction: column;
                gap: 1rem;
                align-items: center;

                .option {
                    width: auto;
                    max-width: 300px;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
