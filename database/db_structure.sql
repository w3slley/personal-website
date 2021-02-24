CREATE TABLE USER(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    joined DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE POST(
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    view_count INT DEFAULT 1,
    slug TEXT NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
    
);

CREATE TABLE TAG
(
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL
);


CREATE TABLE POST_TAG
(
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    
    PRIMARY KEY(post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES TAG(tag_id) ON DELETE CASCADE
);

CREATE TABLE COMMENT(
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    username INT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE COMMENT_POST
(
    post_id INT NOT NULL,
    comment_id INT NOT NULL,
    
    PRIMARY KEY(post_id, comment_id),
    
    FOREIGN KEY(post_id) REFERENCES POST(post_id),
    FOREIGN KEY(comment_id) REFERENCES COMMENT(comment_id)
);

INSERT INTO USER (name, username, password, role) VALUES('Weslley Victor', 'wvict', '$2b$10$Ml.HEK6niId56t5PMFV01OGA16vXjOnT5h2NAFg0gHtqx6faBM2Hu', 'admin');



