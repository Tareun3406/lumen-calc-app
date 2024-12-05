import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export function useDamageButtonStyle() {
  const minWidth = useMediaQuery("(min-width: 1024px");

  const damageButtonStyle = useMemo(() => {
    return minWidth
      ? { width: 70 }
      : { width: 70}
  }, [minWidth])

  const damageButtonSize = useMemo((): "small" | "medium" | "large" => {
    return minWidth ? "medium" : "medium"
  }, [minWidth])

  return { damageButtonStyle, damageButtonSize }
}

export function useTokenImageStyle() {
  const minWidth = useMediaQuery("(min-width: 1024px)");

  const largeTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 116, width: 116}
      : { height: 116, width: 116}
  }, [minWidth])

  const mediumTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 80, width: 80}
      : { height: 80, width: 80}
  }, [minWidth])

  const smallTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 50, width: 50}
      : { height: 50, width: 50}
  }, [ minWidth])

  return { largeTokenStyle, mediumTokenStyle, smallTokenStyle }
}