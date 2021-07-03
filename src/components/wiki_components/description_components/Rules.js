import React from "react";
import "./DescriptWiki.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Rules() {
  return (
    <div>
      <Container className="about-container">
        <Row>
          <Col>
            <h3 className="heading">Rules</h3>
            <hr className="hr-thin" />
            <div className="rule-card">
              <h2 className=" rule-text sub-title">-Rule 1-</h2>
              <hr className="hr-sub" />
              <h4 className="rule-text ">
                You must post a clear and direct question in the title.
              </h4>
              <h4 className="rule-text">
                The post may contain up to two, short context sentences only if
                they are necessary for understanding the question. Your title
                must end with a question and a question mark.
              </h4>
              <h4 className="rule-text">
                All posts must be written in English so that they are widely
                understood by the user base of the sub.
              </h4>
              <br />
              <br />
            </div>
            <br />
            <br />
            <div className="rule-card">
              <h2 className=" rule-text sub-title">-Rule 2-</h2>
              <hr className="hr-sub" />
              <h4 className="rule-text ">
                GratiS is NOT your personal or professional advice platform.
              </h4>
              <h4 className="rule-text">
                Any post asking for advice should be generic and not specific to
                your situation alone. Do not include first person pronouns in
                your title.
              </h4>
              <h4 className="rule-text">
                In GratiS, your title should always be about the question
                itself.
              </h4>
              <h4 className="rule-text">
                If the question is focused on your personal story or is only
                relevant to your experience, it is not suitable for AskReddit.
                Crowdsourcing naming decisions, purchases, etc, is not
                appropriate.
              </h4>
              <br />
              <br />
            </div>
            <br />
            <br />
            <div className="rule-card">
              <h2 className=" rule-text sub-title">-Rule 3-</h2>
              <hr className="hr-sub" />
              <h4 className="rule-text ">
                Posting or seeking any identifying personal information, real or
                fake, will result in a ban without a prior warning.
              </h4>
              <h4 className="rule-text">
                Asking questions designed to draw attention to specific
                usernames related to social media, or posting comments to call
                out another Reddit user are also not allowed.
              </h4>
              <br />
              <br />
            </div>
            <br />
            <br />
            <div className="rule-card">
              <h2 className=" rule-text sub-title">-Rule 4-</h2>
              <hr className="hr-sub" />
              <h4 className="rule-text ">
                All users are expected to be respectful to other users at all
                times and conduct their behaviour in a civil manner. Personal
                attacks or comments that insult or demean a specific user or
                group of users will be removed and regular or egregious
                violations will result in bans. Slur use is not allowed in
                GratiS
              </h4>
              <br />
              <br />
            </div>
            <br />
            <br />
            <div className="rule-card">
              <h2 className=" rule-text sub-title">-Rule 5-</h2>
              <hr className="hr-sub" />
              <h4 className="rule-text ">
                Comment replies consisting solely of images will be removed.
                ASCII images over one line are also not allowed. You may post
                single line emoticons (ಠ◡ಠ, ʘ‿ʘ, ¯\_(ツ)_/¯ , etc.), but large
                ASCII images and vertical text do not add value to discussion
                and will be treated as spam.
              </h4>
              <br />
              <br />
            </div>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
