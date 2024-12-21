import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  useColorScheme
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { setOpenSettingsDialog } from "../../app/slices/dialogSlice";
import { ChangeEvent } from "react";
import { selectSettings, setFlipPanel } from "../../app/slices/settingsSlice";

export interface ISettingsDialogProps {
  open: boolean
  handleClose: () => void;
}

function SettingsDialog(props: ISettingsDialogProps) {
  const dispatch = useAppDispatch();
  const settingsState = useAppSelector(selectSettings)
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
  const handleFlipToggle = () => {
    dispatch(setFlipPanel(!settingsState.flipPanel));
  }
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>설정</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked={themeMode === "dark"} onChange={handleThemeToggle}/>} label="다크 모드" />
          <FormControlLabel control={<Switch defaultChecked={settingsState.flipPanel} onChange={handleFlipToggle}/>} label="2P 좌우 반전" />
        </FormGroup>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog;