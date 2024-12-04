import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  useColorScheme
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks/storeHooks";
import { setOpenSettingsDialog } from "../../app/slices/dialogSlice";
import { ChangeEvent } from "react";

export interface ISettingsDialogProps {
  open: boolean
  handleClose: () => void;
}

function SettingsDialog(props: ISettingsDialogProps) {
  const dispatch = useAppDispatch();
  const { mode: themeMode, setMode: setThemeMode } = useColorScheme();

  const handleClose = () => {
    props.handleClose();
    dispatch(setOpenSettingsDialog(false))
  }

  const handleThemeToggle = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setThemeMode("dark");
      return;
    }
    setThemeMode("light");
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>설정</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel control={<Switch value={themeMode === "dark"} onChange={handleThemeToggle}/>} label="다크 모드" />
        </FormGroup>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog;