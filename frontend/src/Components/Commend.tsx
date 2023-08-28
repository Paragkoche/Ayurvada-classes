import { post_video_command_of_command } from "@/api";
import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
interface CommentType {
  id: string;
  comment: string;
  user: any;
  Comment_of_Comment: CommentType[];
  CreateAt: Date;
  UpdateAt: Date;
}

const Comment = ({ comment, data }: { comment: CommentType; data: any }) => {
  const [_comment, setComment] = useState<string>("");
  console.log(comment.Comment_of_Comment);
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <Box mt={2}>
      <Paper elevation={3} variant="outlined">
        <Box p={2}>
          <Typography my={3} variant="h5">
            {comment?.user?.name} Comment: <br />
            {comment.comment}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <FormControl fullWidth>
              <InputLabel>Comment</InputLabel>
              <OutlinedInput
                multiline
                label="Comment"
                value={_comment}
                onChange={(e) => setComment(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        post_video_command_of_command(
                          comment.id,
                          _comment
                        ).then(({ data }) => {
                          data((a: any) => ({
                            data: {
                              ...a?.data,
                              Comments: [
                                ...a?.data.Comments,
                                JSON.parse(data).data,
                              ],
                            },
                          }));
                        });
                      }}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
            <Button onClick={toggleReplies} variant="outlined" size="small">
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
          </Stack>
        </Box>
      </Paper>
      {showReplies && (
        <Box ml={2} mt={1}>
          {comment?.Comment_of_Comment?.map((reply) => (
            <Comment key={reply.id} comment={reply} data={data} />
          ))}
        </Box>
      )}
    </Box>
  );
};
export default Comment;
