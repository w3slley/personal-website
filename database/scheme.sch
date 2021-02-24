table USER
(
    _ user_id _,
    name,
    username,
    password,
    role,
    joined
)

table POST
(
    _ post_id _,
    title,
    user_id --> USER.user_id,
    content,
    date,
    view_count
)

table TAG
(
    _ tag_id _,
    label
)
table POST_TAG
(
    _ post_id _ --> POST.post_id,
    _ tag_id _ --> TAG.tag_id
)
table COMMENT_POST
(
    _ post_id _ -->POST.post_id,
    _ comment_id _ -->COMMENT.comment_id
)

table COMMENT(
    _ comment_id _,
    username,
    content,
    date
)

