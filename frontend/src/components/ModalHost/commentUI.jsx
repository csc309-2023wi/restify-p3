// import icons
import iconStarEmpty from "../../assets/icons/star-empty.svg";
import iconStarFilled from "../../assets/icons/star-filled.svg";
import iconArrowRightPurple from "../../assets/icons/arrow-right-purple.svg";
import userAvatarDefault from "../../assets/images/user-avatar-default.png";

export function CommentsAndRatings() {
    return (
        <>
            <li>
                <div className="comment-card main-comment has-ratings">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div className="comment-info">
                        <h4>Jane Doe</h4>
                        <div className="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span className="date">March 10, 2025</span> To{" "}
                            <span className="date">March 15, 2025</span>
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <details className="reply-container">
                    <summary
                        className="comments-dropdown"
                        comments-open="Hide Replies"
                        comments-hidden="Show Replies"></summary>
                    <div className="comment-card reply host-reply">
                        <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div className="comment-info">
                            <h4>John Doe</h4>
                            <span className="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                    <div className="comment-card reply">
                        <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div className="comment-info">
                            <h4>Jane Doe</h4>
                            <span className="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="reply-input-container">
                                <textarea placeholder="Reply to comment..."></textarea>
                                <button className="send-arrow">
                                    <img src={iconArrowRightPurple} alt="Send reply" />
                                </button>
                            </div>
                        </div>
                    </div>
                </details>
            </li>

            <li>
                <div className="comment-card main-comment">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div className="comment-info">
                        <h4>Jane Doe</h4>
                        <div className="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span className="date">March 10, 2025</span> To{" "}
                            <span className="date">March 15, 2025</span>
                        </p>
                        <div className="reply-input-container">
                            <textarea placeholder="Reply to comment..."></textarea>
                            <button className="send-arrow">
                                <img src={iconArrowRightPurple} alt="Send reply" />
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div className="comment-card main-comment has-ratings">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div className="comment-info">
                        <h4>Jane Doe</h4>
                        <div className="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span className="date">March 10, 2025</span> To{" "}
                            <span className="date">March 15, 2025</span>
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <details className="reply-container">
                    <summary
                        className="comments-dropdown"
                        comments-open="Hide Replies"
                        comments-hidden="Show Replies"></summary>
                    <div className="comment-card reply host-reply">
                        <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div className="comment-info">
                            <h4>John Doe</h4>
                            <span className="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </details>
            </li>
        </>
    );
}

export function PastGuestCanStillComment() {
    return (
        <li>
            <div className="past-guest-card has-ratings">
                <div className="guest-info">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <h4>Jane Doe</h4>
                </div>

                <div className="rating-container">
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                </div>
                <div className="reply-input-container">
                    <textarea placeholder="Leave a rating..."></textarea>
                    <button className="send-arrow">
                        <img src={iconArrowRightPurple} alt="Send comment" />
                    </button>
                </div>
            </div>
            <details>
                <summary
                    className="comments-dropdown"
                    comments-open="Hide Host Ratings"
                    comments-hidden="Show Host Ratings"></summary>
                <ul>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </details>
        </li>
    );
}

export function PastGuestAlreadyCommented() {
    return (
        <li>
            <div className="past-guest-card has-ratings">
                <div className="guest-info">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <h4>Jane Doe</h4>
                </div>
            </div>
            <details>
                <summary
                    className="comments-dropdown"
                    comments-open="Hide Host Ratings"
                    comments-hidden="Show Host Ratings"></summary>
                <ul>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </details>
        </li>
    );
}

export function RequestCardComments() {
    return (
        <details>
            <summary
                className="comments-dropdown"
                comments-open="Hide Comments"
                comments-hidden="Show Comments"></summary>
            <div className="request-card host-comment">
                <div className="request-card-content">
                    <img src={userAvatarDefault} className="profile-img" alt="avatar" />
                    <div className="request-card-info">
                        <h4>John Doe</h4>
                        <div className="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            <span className="date">March 1, 2025</span>
                        </p>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </div>
        </details>
    );
}
