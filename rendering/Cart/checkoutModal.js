function openCheckoutModal(cart) {
    if (!Array.isArray(cart) || cart.length === 0) {
        return;
    }

    const oldModal = document.querySelector("#checkoutModal");

    if (oldModal) {
        oldModal.remove();
    }

    const total = cart.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;

        return sum + price * quantity;
    }, 0);

    const modal = document.createElement("div");

    modal.id = "checkoutModal";
    modal.className = "checkout-modal";

    modal.innerHTML = `
        <div
            class="checkout-modal__backdrop"
            data-checkout-close
        ></div>

        <section
            class="checkout-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkoutModalTitle"
        >
            <button
                class="checkout-modal__close"
                type="button"
                aria-label="Закрыть"
                data-checkout-close
            >
                &times;
            </button>

            <div class="checkout-modal__header">
                <p class="checkout-modal__eyebrow">
                    Заказ запчастей
                </p>

                <h2 id="checkoutModalTitle">
                    Оформление заказа
                </h2>

                <p class="checkout-modal__subtitle">
                    Оставьте контактные данные — менеджер свяжется
                    с вами для подтверждения заказа.
                </p>
            </div>

            <form
                id="checkoutForm"
                class="checkout-modal__form"
                novalidate
            >
                <div class="checkout-modal__layout">

                    <div class="checkout-modal__fields">

                        <div class="checkout-modal__section-title">
                            Контактные данные
                        </div>

                        <label class="checkout-field">
                            <span>
                                Имя <b>*</b>
                            </span>

                            <input
                                name="name"
                                type="text"
                                autocomplete="name"
                                placeholder="Например, Алексей"
                                required
                                maxlength="120"
                            >

                            <small data-error-for="name"></small>
                        </label>

                        <label class="checkout-field">
                            <span>
                                Телефон <b>*</b>
                            </span>

                            <input
                                name="phone"
                                type="tel"
                                autocomplete="tel"
                                placeholder="+7 (900) 000-00-00"
                                required
                                maxlength="32"
                            >

                            <small data-error-for="phone"></small>
                        </label>

                        <label class="checkout-field">
                            <span>
                                Комментарий
                            </span>

                            <textarea
                                name="comment"
                                rows="4"
                                placeholder="Например, удобное время звонка"
                                maxlength="500"
                            ></textarea>
                        </label>

                        <label class="checkout-consent">
                            <input
                                id="personalDataConsent"
                                name="personalDataConsent"
                                type="checkbox"
                            >

                            <span>
                                Я даю согласие на обработку
                                своих персональных данных
                            </span>
                        </label>

                        <small
                            class="checkout-consent__error"
                            data-error-for="personalDataConsent"
                        ></small>

                    </div>

                    <aside class="checkout-modal__summary">

                        <div>
                            <div class="checkout-modal__summary-title">
                                Ваш заказ
                            </div>

                            <div class="checkout-modal__items">
                                ${cart.map((item) => `
                                    <div class="checkout-modal__item">

                                        <div>
                                            <div class="checkout-modal__item-name">
                                                ${escapeCheckoutHtml(item.name)}
                                            </div>

                                            <div class="checkout-modal__item-meta">
                                                ${escapeCheckoutHtml(
                                                    item.code || "Без кода"
                                                )}
                                                ·
                                                ${Number(item.quantity) || 0}
                                                шт.
                                            </div>
                                        </div>

                                        <strong>
                                            ${formatCheckoutPrice(
                                                (Number(item.price) || 0) *
                                                (Number(item.quantity) || 0)
                                            )}
                                        </strong>

                                    </div>
                                `).join("")}
                            </div>
                        </div>

                        <div class="checkout-modal__total-row">
                            <span>
                                Итого
                            </span>

                            <strong>
                                ${formatCheckoutPrice(total)}
                            </strong>
                        </div>

                        <button
                            class="
                                checkout-modal__submit
                                background-primary
                                color-white
                            "
                            type="submit"
                        >
                            Подтвердить заказ
                        </button>

                        <p class="checkout-modal__note">
                            После отправки заявки менеджер свяжется
                            с вами для подтверждения заказа.
                        </p>

                        <div
                            id="checkoutFormStatus"
                            class="checkout-form-status"
                            role="status"
                            aria-live="polite"
                        ></div>

                    </aside>

                </div>
            </form>
        </section>
    `;

    document.body.appendChild(modal);

    document.body.classList.add(
        "checkout-modal-open"
    );

    const form =
        modal.querySelector("#checkoutForm");

    const status =
        modal.querySelector("#checkoutFormStatus");

    const submitButton =
        modal.querySelector(
            ".checkout-modal__submit"
        );

    const closeModal = () => {
        document.body.classList.remove(
            "checkout-modal-open"
        );

        modal.remove();

        document.removeEventListener(
            "keydown",
            onKeyDown
        );
    };

    const onKeyDown = (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    modal
        .querySelectorAll(
            "[data-checkout-close]"
        )
        .forEach((element) => {
            element.addEventListener(
                "click",
                closeModal
            );
        });

    document.addEventListener(
        "keydown",
        onKeyDown
    );

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearCheckoutErrors(form);

            status.className =
                "checkout-form-status";

            status.textContent = "";

            const formData =
                new FormData(form);

            const name =
                String(
                    formData.get("name") || ""
                ).trim();

            const phone =
                String(
                    formData.get("phone") || ""
                ).trim();

            const comment =
                String(
                    formData.get("comment") || ""
                ).trim();

            const consent =
                formData.get(
                    "personalDataConsent"
                ) === "on";

            const errors =
                validateCheckoutForm({
                    name,
                    phone,
                    consent
                });

            if (Object.keys(errors).length > 0) {
                showCheckoutErrors(
                    form,
                    errors
                );

                return;
            }

            const orderPayload = {
                customer: {
                    name,
                    phone,
                    comment,
                    personalDataConsent: consent
                },

                items: cart.map((item) => ({
                    productId:
                        item.id ??
                        item.productId ??
                        null,

                    code: item.code,

                    name: item.name,

                    price:
                        Number(item.price) || 0,

                    quantity:
                        Number(item.quantity) || 0
                })),

                total,

                currency: "RUB"
            };

            submitButton.disabled = true;

            submitButton.textContent =
                "Оформляем...";

            try {
                const result =
                    await createOrder(
                        orderPayload
                    );

                const orderNumber =
                    result.orderNumber ||
                    result.id ||
                    result.orderId;

                status.className =
                    "checkout-form-status checkout-form-status--success";

                status.innerHTML =
                    orderNumber
                        ? `
                            Заказ
                            <strong>
                                №${escapeCheckoutHtml(
                                    String(orderNumber)
                                )}
                            </strong>
                            принят.
                            Менеджер свяжется с вами
                            для подтверждения.
                          `
                        : `
                            Заказ принят.
                            Менеджер свяжется с вами
                            для подтверждения.
                          `;

                submitButton.textContent =
                    "Заказ оформлен";

                form
                    .querySelectorAll(
                        "input, textarea"
                    )
                    .forEach((field) => {
                        field.disabled = true;
                    });

                window.setTimeout(
                    closeModal,
                    2200
                );

            } catch (error) {

                console.error(
                    "Ошибка оформления заказа:",
                    error
                );

                status.className =
                    "checkout-form-status checkout-form-status--error";

                status.textContent =
                    error.message ||
                    "Не удалось оформить заказ. Попробуйте ещё раз.";

                submitButton.disabled = false;

                submitButton.textContent =
                    "Подтвердить заказ";
            }
        }
    );
}


function validateCheckoutForm(data) {

    const errors = {};

    if (data.name.length < 2) {
        errors.name =
            "Укажите имя.";
    }

    const normalizedPhone =
        data.phone.replace(
            /[^\d+]/g,
            ""
        );

    if (normalizedPhone.length < 10) {
        errors.phone =
            "Укажите корректный номер телефона.";
    }

    if (!data.consent) {
        errors.personalDataConsent =
            "Необходимо дать согласие на обработку персональных данных.";
    }

    return errors;
}


function showCheckoutErrors(
    form,
    errors
) {
    Object.entries(errors)
        .forEach(
            ([fieldName, message]) => {

                const field =
                    form.elements[fieldName];

                const error =
                    form.querySelector(
                        `[data-error-for="${fieldName}"]`
                    );

                if (field) {
                    field.classList.add(
                        "checkout-input--error"
                    );
                }

                if (error) {
                    error.textContent =
                        message;
                }
            }
        );
}


function clearCheckoutErrors(form) {

    form
        .querySelectorAll(
            ".checkout-input--error"
        )
        .forEach((field) => {
            field.classList.remove(
                "checkout-input--error"
            );
        });

    form
        .querySelectorAll(
            "[data-error-for]"
        )
        .forEach((element) => {
            element.textContent = "";
        });
}


function formatCheckoutPrice(value) {
    return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}


function escapeCheckoutHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}